import { Injectable } from '@angular/core';
import { GameState } from '../../game/models/game-state';
@Injectable({ providedIn: 'root' })
export class FinanceSystemService {
  adjustCapital(state: GameState, delta: number): GameState {
    return { ...state, finance: { capital: state.finance.capital + delta } };
  }
}
