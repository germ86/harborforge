import { Injectable } from '@angular/core';
import { createInitialGameState } from '../../game/state/initial-state';
import { GameState } from '../../game/models/game-state';
import { SavegameService } from './savegame.service';
import { GameStateService } from './game-state.service';
import { TimeSystemService } from './time-system.service';
import { FinanceSystemService } from './finance-system.service';
import { InventorySystemService, Material } from './inventory-system.service';
import { LogSystemService } from './log-system.service';

@Injectable({ providedIn: 'root' })
export class GameActionService {
  private readonly prices: Record<Material, number> = { steel: 100, wood: 50, paint: 25 };
  constructor(private save: SavegameService, private state: GameStateService, private time: TimeSystemService, private finance: FinanceSystemService, private inventory: InventorySystemService, private log: LogSystemService) {}
  async createNewGame(uid: string): Promise<void> { const s = createInitialGameState(crypto.randomUUID()); this.state.setState(s); await this.save.saveGame(uid, s); }
  async loadSavegame(uid: string, saveId: string): Promise<void> { const s = await this.save.loadSavegame(uid, saveId); if (s) this.state.setState(s); }
  async deleteSavegame(uid: string, saveId: string): Promise<void> { await this.save.deleteSavegame(uid, saveId); }
  async nextDay(uid: string): Promise<void> { const s = this.requireState(); let n = this.time.nextDay(s); n = this.log.addLog(n, 'Advanced to next day.'); this.state.setState(n); await this.save.saveGame(uid, n); }
  async buyMaterial(uid: string, material: Material): Promise<void> { await this.trade(uid, material, 1, -this.prices[material], 'Bought'); }
  async sellMaterial(uid: string, material: Material): Promise<void> { await this.trade(uid, material, -1, this.prices[material], 'Sold'); }
  private async trade(uid: string, material: Material, qty: number, money: number, verb: string): Promise<void> { let s = this.requireState(); if (qty > 0 && s.finance.capital < -money) return; s = this.inventory.adjustMaterial(s, material, qty); s = this.finance.adjustCapital(s, money); s = this.log.addLog(s, `${verb} 1 ${material}.`); this.state.setState(s); await this.save.saveGame(uid, s); }
  private requireState(): GameState { const s = this.state.snapshot; if (!s) throw new Error('No game loaded'); return s; }
}
