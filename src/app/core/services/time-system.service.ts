import { Injectable } from '@angular/core';
import { GameState } from '../../game/models/game-state';
@Injectable({ providedIn: 'root' })
export class TimeSystemService {
  nextDay(state: GameState): GameState {
    const [d, m, y] = state.currentDate.split(' ');
    const date = new Date(`${d} ${m} ${y} UTC`);
    date.setUTCDate(date.getUTCDate() + 1);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
    const year = date.getUTCFullYear();
    return { ...state, currentDate: `${day} ${month} ${year}` };
  }
}
