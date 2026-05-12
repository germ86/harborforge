import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GameState } from '../../game/models/game-state';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private readonly stateSubject = new BehaviorSubject<GameState | null>(null);
  readonly state$ = this.stateSubject.asObservable();
  get snapshot(): GameState | null { return this.stateSubject.value; }
  setState(state: GameState): void { this.stateSubject.next({ ...state, updatedAt: Date.now() }); }
}
