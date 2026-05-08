import { Injectable } from '@angular/core';
import { GameState } from '../../game/models/game-state';
@Injectable({ providedIn: 'root' })
export class LogSystemService {
  addLog(state: GameState, message: string): GameState {
    return { ...state, logs: [...state.logs, { timestamp: new Date().toISOString(), message }] };
  }
}
