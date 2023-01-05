import { createContext } from 'react';

import { TGameDispatch, TGameState } from './types';
import { defaultGameState } from './utils';

export const GameContext = createContext<{
    gameState: TGameState;
    gameDispatch: TGameDispatch;
}>({
    gameState: defaultGameState,
    gameDispatch: () => null,
});
