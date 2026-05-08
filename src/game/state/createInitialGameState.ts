import { initialContracts } from '../data/initialContracts';
import { GameState } from '../models';

export const createInitialGameState = (): GameState => ({
  day: 1,
  player: {
    money: 100000,
    reputation: 10,
  },
  resources: {
    steel: 500,
    electronics: 80,
    fuel: 200,
  },
  shipyard: {
    workforce: 25,
    docks: 2,
  },
  contracts: initialContracts.map((contract) => ({ ...contract })),
});
