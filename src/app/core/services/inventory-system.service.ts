import { Injectable } from '@angular/core';
import { GameState } from '../../game/models/game-state';
export type Material = 'steel' | 'wood' | 'paint';
@Injectable({ providedIn: 'root' })
export class InventorySystemService {
  adjustMaterial(state: GameState, material: Material, delta: number): GameState {
    const next = state.inventory[material] + delta;
    if (next < 0) return state;
    return { ...state, inventory: { ...state.inventory, [material]: next } };
  }
}
