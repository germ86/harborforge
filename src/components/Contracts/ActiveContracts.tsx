import { Contract } from '../../game/models';

interface ActiveContractsProps {
  contracts: Contract[];
}

export default function ActiveContracts({ contracts }: ActiveContractsProps) {
  return (
    <section>
      <h2>Aktive Aufträge</h2>
      {contracts.length === 0 ? (
        <p>Derzeit keine aktiven Aufträge.</p>
      ) : (
        <ul>
          {contracts.map((contract) => {
            const progress = contract.durationDays - contract.remainingDays;
            return (
              <li key={contract.id}>
                <strong>{contract.name}</strong> – Restdauer: {contract.remainingDays} Tag(e)
                <div>
                  Fortschritt: {progress}/{contract.durationDays}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
