import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { GameState } from '../../game/models/game-state';

@Injectable({ providedIn: 'root' })
export class SavegameService {
  constructor(private db: Firestore) {}
  async saveGame(uid: string, state: GameState): Promise<void> {
    await setDoc(doc(this.db, 'users', uid, 'savegames', state.id), state);
  }
  async listSavegames(uid: string): Promise<GameState[]> {
    const snap = await getDocs(collection(this.db, 'users', uid, 'savegames'));
    return snap.docs.map(d => d.data() as GameState);
  }
  async loadSavegame(uid: string, saveId: string): Promise<GameState | null> {
    const saves = await this.listSavegames(uid);
    return saves.find(s => s.id === saveId) ?? null;
  }
  async deleteSavegame(uid: string, saveId: string): Promise<void> {
    await deleteDoc(doc(this.db, 'users', uid, 'savegames', saveId));
  }
}
