import { GameState } from '../models';
import { createInitialGameState } from './createInitialGameState';

const GAME_STATE_STORAGE_KEY = 'harborforge.gameState';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isValidGameState = (value: unknown): value is GameState => {
  if (!isObject(value)) {
    return false;
  }

  if (typeof value.day !== 'number') {
    return false;
  }

  if (!isObject(value.player) || typeof value.player.money !== 'number' || typeof value.player.reputation !== 'number') {
    return false;
  }

  if (
    !isObject(value.resources) ||
    typeof value.resources.steel !== 'number' ||
    typeof value.resources.electronics !== 'number' ||
    typeof value.resources.fuel !== 'number'
  ) {
    return false;
  }

  if (
    !isObject(value.shipyard) ||
    typeof value.shipyard.workforce !== 'number' ||
    typeof value.shipyard.docks !== 'number'
  ) {
    return false;
  }

  return Array.isArray(value.contracts);
};

export const loadGameState = (): GameState => {
  try {
    const serializedState = localStorage.getItem(GAME_STATE_STORAGE_KEY);

    if (!serializedState) {
      return createInitialGameState();
    }

    const parsedState: unknown = JSON.parse(serializedState);

    if (!isValidGameState(parsedState)) {
      return createInitialGameState();
    }

    return parsedState;
  } catch {
    return createInitialGameState();
  }
};

export const saveGameState = (state: GameState): void => {
  try {
    localStorage.setItem(GAME_STATE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore write errors (e.g. private mode / quota exceeded)
  }
};

export const resetGameState = (): void => {
  try {
    localStorage.removeItem(GAME_STATE_STORAGE_KEY);
  } catch {
    // Ignore remove errors to keep reset flow resilient
  }
};
