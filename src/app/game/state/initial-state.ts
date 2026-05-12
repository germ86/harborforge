import { GameState } from '../models/game-state';

export const createInitialGameState = (id: string): GameState => ({
  id,
  companyName: 'HarborForge Company',
  reputation: 50,
  companyLevel: 1,
  currentDate: '01 JAN 2026',
  buildings: ['Small Workshop', 'Small Storage Hall'],
  shipStorage: 3,
  inventory: { steel: 20, wood: 10, paint: 5 },
  finance: { capital: 10000 },
  logs: [{ timestamp: new Date().toISOString(), message: 'New game created.' }],
  updatedAt: Date.now()
});
