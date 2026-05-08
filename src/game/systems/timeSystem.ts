import { GameState } from '../models';

export const advanceDay = (state: GameState): GameState => {
  let gainedMoney = 0;
  let gainedReputation = 0;
  let freedWorkforce = 0;
  let freedDocks = 0;

  const contracts = state.contracts.map((contract) => {
    if (contract.status !== 'active') {
      return contract;
    }

    const remainingDays = Math.max(contract.remainingDays - 1, 0);

    if (remainingDays > 0) {
      return {
        ...contract,
        remainingDays,
      };
    }

    gainedMoney += contract.rewardMoney;
    gainedReputation += contract.rewardReputation;
    freedWorkforce += contract.requiredWorkforce;
    freedDocks += contract.requiredDocks;

    return {
      ...contract,
      status: 'completed',
      remainingDays: 0,
    };
  });

  return {
    ...state,
    day: state.day + 1,
    player: {
      money: state.player.money + gainedMoney,
      reputation: state.player.reputation + gainedReputation,
    },
    shipyard: {
      workforce: state.shipyard.workforce + freedWorkforce,
      docks: state.shipyard.docks + freedDocks,
    },
    contracts,
  };
};
