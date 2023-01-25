import { createContext } from 'react';

import { defaultGameState } from './defaults';
import { T_GameDispatch, T_GameState } from './types';

export const CTX_Game = createContext<{
    gameState: T_GameState;
    gameDispatch: T_GameDispatch;
}>({
    gameState: defaultGameState,
    gameDispatch: () => null,
});
