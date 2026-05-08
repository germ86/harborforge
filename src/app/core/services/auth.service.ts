import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, signInWithPopup, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { authState } from 'rxfire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | null>;
  constructor(private auth: Auth) { this.user$ = authState(this.auth); }
  loginWithGoogle(): Promise<void> { return signInWithPopup(this.auth, new GoogleAuthProvider()).then(() => {}); }
  logout(): Promise<void> { return signOut(this.auth); }
}
