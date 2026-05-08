import { Contract } from '../../game/models';

interface ContractListProps {
  contracts: Contract[];
  onAccept: (contractId: string) => void;
  getAcceptanceIssues: (contract: Contract) => string[];
}

export default function ContractList({ contracts, onAccept, getAcceptanceIssues }: ContractListProps) {
  return (
    <section>
      <h2>Verfügbare Aufträge</h2>
      {contracts.length === 0 ? (
        <p>Keine Aufträge verfügbar.</p>
      ) : (
        <ul>
          {contracts.map((contract) => {
            const issues = getAcceptanceIssues(contract);
            const canAccept = issues.length === 0;

            return (
              <li key={contract.id}>
                <h3>{contract.name}</h3>
                <p>{contract.description}</p>
                <p>
                  Bedarf: {contract.requiredSteel} Stahl, {contract.requiredElectronics} Elektronik, {contract.requiredFuel}{' '}
                  Treibstoff, {contract.requiredWorkforce} Arbeitskräfte, {contract.requiredDocks} Dock(s)
                </p>
                <p>
                  Dauer: {contract.durationDays} Tage · Belohnung: {contract.rewardMoney.toLocaleString('de-DE')} ₡ · Reputation +
                  {contract.rewardReputation}
                </p>
                <button type="button" onClick={() => onAccept(contract.id)} disabled={!canAccept}>
                  Auftrag annehmen
                </button>
                {!canAccept && <p>Nicht möglich: {issues.join(', ')}</p>}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
