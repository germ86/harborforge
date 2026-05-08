import { Contract, GameState } from '../models';

export const canAcceptContract = (state: GameState, contract: Contract): boolean => {
  if (contract.status !== 'available') {
    return false;
  }

  return (
    state.resources.steel >= contract.requiredSteel &&
    state.resources.electronics >= contract.requiredElectronics &&
    state.resources.fuel >= contract.requiredFuel &&
    state.shipyard.workforce >= contract.requiredWorkforce &&
    state.shipyard.docks >= contract.requiredDocks
  );
};

export const acceptContract = (state: GameState, contractId: string): GameState => {
  const contract = state.contracts.find((entry) => entry.id === contractId);

  if (!contract) {
    return state;
  }

  if (!canAcceptContract(state, contract)) {
    return state;
  }

  return {
    ...state,
    resources: {
      steel: state.resources.steel - contract.requiredSteel,
      electronics: state.resources.electronics - contract.requiredElectronics,
      fuel: state.resources.fuel - contract.requiredFuel,
    },
    shipyard: {
      workforce: state.shipyard.workforce - contract.requiredWorkforce,
      docks: state.shipyard.docks - contract.requiredDocks,
    },
    contracts: state.contracts.map((entry) =>
      entry.id === contractId
        ? {
            ...entry,
            status: 'active',
            remainingDays: entry.durationDays,
          }
        : entry,
    ),
  };
};
