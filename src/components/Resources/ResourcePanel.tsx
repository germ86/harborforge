import { ResourceState, ShipyardState } from '../../game/models';

interface ResourcePanelProps {
  resources: ResourceState;
  shipyard: ShipyardState;
}

export default function ResourcePanel({ resources, shipyard }: ResourcePanelProps) {
  return (
    <section>
      <h2>Ressourcen</h2>
      <ul>
        <li>Stahl: {resources.steel}</li>
        <li>Elektronik: {resources.electronics}</li>
        <li>Treibstoff: {resources.fuel}</li>
        <li>Arbeitskräfte frei: {shipyard.workforce}</li>
        <li>Docks frei: {shipyard.docks}</li>
      </ul>
    </section>
  );
}
