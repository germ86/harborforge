export type ContractStatus = 'available' | 'active' | 'completed';

export interface Contract {
  id: string;
  name: string;
  description: string;
  requiredSteel: number;
  requiredElectronics: number;
  requiredFuel: number;
  requiredWorkforce: number;
  requiredDocks: number;
  durationDays: number;
  remainingDays: number;
  rewardMoney: number;
  rewardReputation: number;
  status: ContractStatus;
}

export interface ResourceState {
  steel: number;
  electronics: number;
  fuel: number;
}

export interface ShipyardState {
  workforce: number;
  docks: number;
}

export interface PlayerCompany {
  money: number;
  reputation: number;
}

export interface GameState {
  day: number;
  player: PlayerCompany;
  resources: ResourceState;
  shipyard: ShipyardState;
  contracts: Contract[];
}
