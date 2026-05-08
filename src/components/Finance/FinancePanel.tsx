interface FinancePanelProps {
  day: number;
  money: number;
  reputation: number;
}

export default function FinancePanel({ day, money, reputation }: FinancePanelProps) {
  return (
    <section>
      <h2>Unternehmen</h2>
      <ul>
        <li>Tag: {day}</li>
        <li>Geld: {money.toLocaleString('de-DE')} ₡</li>
        <li>Reputation: {reputation}</li>
      </ul>
    </section>
  );
}
