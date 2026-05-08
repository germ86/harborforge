export interface Inventory { steel: number; wood: number; paint: number; }
export interface Finance { capital: number; }
export interface GameLogEntry { timestamp: string; message: string; }
export interface GameState {
  id: string;
  companyName: string;
  reputation: number;
  companyLevel: number;
  currentDate: string;
  buildings: string[];
  shipStorage: number;
  inventory: Inventory;
  finance: Finance;
  logs: GameLogEntry[];
  updatedAt: number;
}
