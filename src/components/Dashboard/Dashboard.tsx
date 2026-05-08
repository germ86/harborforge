import ActiveContracts from '../Contracts/ActiveContracts';
import ContractList from '../Contracts/ContractList';
import FinancePanel from '../Finance/FinancePanel';
import ResourcePanel from '../Resources/ResourcePanel';
import { Contract, GameState } from '../../game/models';

interface DashboardProps {
  state: GameState;
  availableContracts: Contract[];
  activeContracts: Contract[];
  onAcceptContract: (contractId: string) => void;
  onAdvanceDay: () => void;
  onResetGame: () => void;
  getAcceptanceIssues: (contract: Contract) => string[];
}

export default function Dashboard({
  state,
  availableContracts,
  activeContracts,
  onAcceptContract,
  onAdvanceDay,
  onResetGame,
  getAcceptanceIssues,
}: DashboardProps) {
  return (
    <main>
      <h1>Harborforge</h1>
      <FinancePanel day={state.day} money={state.player.money} reputation={state.player.reputation} />
      <ResourcePanel resources={state.resources} shipyard={state.shipyard} />
      <ContractList contracts={availableContracts} onAccept={onAcceptContract} getAcceptanceIssues={getAcceptanceIssues} />
      <ActiveContracts contracts={activeContracts} />
      <section>
        <h2>Steuerung</h2>
        <button type="button" onClick={onAdvanceDay}>
          Nächster Tag
        </button>
        <button type="button" onClick={onResetGame}>
          Neues Spiel starten
        </button>
      </section>
    </main>
  );
}
