import { useMemo, useState } from 'react';
import './firebase/init';
import Dashboard from './components/Dashboard/Dashboard';
import { createInitialGameState } from './game/state/createInitialGameState';
import { Contract } from './game/models';
import { acceptContract } from './game/systems/contractSystem';
import { advanceDay } from './game/systems/timeSystem';

export default function App() {
  const [gameState, setGameState] = useState(createInitialGameState);

  const availableContracts = useMemo(
    () => gameState.contracts.filter((contract) => contract.status === 'available'),
    [gameState.contracts],
  );

  const activeContracts = useMemo(
    () => gameState.contracts.filter((contract) => contract.status === 'active'),
    [gameState.contracts],
  );

  const getAcceptanceIssues = (contract: Contract): string[] => {
    const reasons: string[] = [];

    if (gameState.resources.steel < contract.requiredSteel) {
      reasons.push('Zu wenig Stahl');
    }
    if (gameState.resources.electronics < contract.requiredElectronics) {
      reasons.push('Zu wenig Elektronik');
    }
    if (gameState.resources.fuel < contract.requiredFuel) {
      reasons.push('Zu wenig Treibstoff');
    }
    if (gameState.shipyard.workforce < contract.requiredWorkforce) {
      reasons.push('Zu wenig freie Arbeitskräfte');
    }
    if (gameState.shipyard.docks < contract.requiredDocks) {
      reasons.push('Keine freien Docks');
    }

    return reasons;
  };

  return (
    <Dashboard
      state={gameState}
      availableContracts={availableContracts}
      activeContracts={activeContracts}
      onAcceptContract={(contractId) => setGameState((state) => acceptContract(state, contractId))}
      onAdvanceDay={() => setGameState((state) => advanceDay(state))}
      onResetGame={() => setGameState(createInitialGameState())}
      getAcceptanceIssues={getAcceptanceIssues}
    />
  );
}
