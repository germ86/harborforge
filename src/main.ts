import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, Routes, RouterLink } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from './environments/environment';
import { AuthService } from './app/core/services/auth.service';
import { SavegameService } from './app/core/services/savegame.service';
import { GameStateService } from './app/core/services/game-state.service';
import { GameActionService } from './app/core/services/game-action.service';

@Component({standalone:true,selector:'app-login',imports:[AsyncPipe,NgIf],template:`<h2>Login</h2><button (click)='login()'>Google Login</button><p *ngIf='(auth.user$|async) as u'>Logged in: {{u.displayName}}</p>`})
class LoginComponent { auth=inject(AuthService); login(){this.auth.loginWithGoogle();}}

@Component({standalone:true,selector:'app-savegames',imports:[NgFor,NgIf],template:`<h2>Savegames</h2><button [disabled]='!uid' (click)='newGame()'>Create New Game</button><div class='card' *ngFor='let s of saves'><b>{{s.id}}</b> <button [disabled]='!uid' (click)='load(s.id)'>Load</button><button [disabled]='!uid' (click)='delete(s.id)'>Delete</button></div>`})
class SavegamesComponent { uid=''; saves:any[]=[]; auth=inject(AuthService); save=inject(SavegameService); actions=inject(GameActionService); constructor(){ this.auth.user$.subscribe(async u=>{ this.uid=u?.uid??''; this.saves=this.uid?await this.save.listSavegames(this.uid):[];}); } async newGame(){await this.actions.createNewGame(this.uid); this.saves=await this.save.listSavegames(this.uid);} async load(id:string){await this.actions.loadSavegame(this.uid,id);} async delete(id:string){await this.actions.deleteSavegame(this.uid,id); this.saves=await this.save.listSavegames(this.uid);} }

@Component({standalone:true,selector:'app-dashboard',imports:[AsyncPipe,NgIf],template:`<h2>Dashboard</h2><div *ngIf='state.state$|async as s'><div class='card'>Capital: €{{s.finance.capital}}</div><div class='card'>Reputation: {{s.reputation}}</div><div class='card'>Company Level: {{s.companyLevel}}</div><div class='card'>Current Date: {{s.currentDate}}</div><button [disabled]='!uid' (click)='nextDay()'>Next Day</button></div>`})
class DashboardComponent{state=inject(GameStateService);actions=inject(GameActionService);auth=inject(AuthService);uid='';constructor(){this.auth.user$.subscribe(u=>this.uid=u?.uid??'');} nextDay(){this.actions.nextDay(this.uid);} }

@Component({standalone:true,selector:'app-inventory',imports:[AsyncPipe,NgIf],template:`<h2>Inventory</h2><div *ngIf='state.state$|async as s'><p>Steel: {{s.inventory.steel}}</p><p>Wood: {{s.inventory.wood}}</p><p>Paint: {{s.inventory.paint}}</p><button [disabled]='!uid' (click)='buy("steel")'>Buy Steel</button><button [disabled]='!uid' (click)='buy("wood")'>Buy Wood</button><button [disabled]='!uid' (click)='buy("paint")'>Buy Paint</button><button [disabled]='!uid' (click)='sell("steel")'>Sell Steel</button><button [disabled]='!uid' (click)='sell("wood")'>Sell Wood</button><button [disabled]='!uid' (click)='sell("paint")'>Sell Paint</button></div>`})
class InventoryComponent{state=inject(GameStateService);actions=inject(GameActionService);auth=inject(AuthService);uid='';constructor(){this.auth.user$.subscribe(u=>this.uid=u?.uid??'');} buy(m:any){this.actions.buyMaterial(this.uid,m);} sell(m:any){this.actions.sellMaterial(this.uid,m);} }

@Component({standalone:true,selector:'app-finance',imports:[AsyncPipe,NgIf,NgFor],template:`<h2>Finance</h2><div *ngIf='state.state$|async as s'>Capital: €{{s.finance.capital}}<h3>Logs</h3><div *ngFor='let l of s.logs'>{{l.message}} ({{l.timestamp}})</div></div>`})
class FinanceComponent{state=inject(GameStateService);}

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'savegames', component: SavegamesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'finance', component: FinanceComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@Component({standalone:true,selector:'app-root',imports:[RouterOutlet,RouterLink],template:`<h1>HarborForge</h1><nav><a routerLink='/login'>Login</a><a routerLink='/savegames'>Savegames</a><a routerLink='/dashboard'>Dashboard</a><a routerLink='/inventory'>Inventory</a><a routerLink='/finance'>Finance</a></nav><router-outlet></router-outlet>`})
class AppComponent {}

const firebaseProviders = [
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  ...(typeof window !== 'undefined' ? [provideAnalytics(() => getAnalytics())] : [])
];

bootstrapApplication(AppComponent, { providers: [provideRouter(routes), ...firebaseProviders] });
