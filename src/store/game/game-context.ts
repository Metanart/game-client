import { createContext } from 'react';

import { defaultGameState } from './defaults';
import { TGameDispatch, TGameState } from './types';

export const GameContext = createContext<{
    gameState: TGameState;
    gameDispatch: TGameDispatch;
}>({
    gameState: defaultGameState,
    gameDispatch: () => null,
});
