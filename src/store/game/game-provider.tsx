import { FC, ReactNode, useReducer } from 'react';

import { CTX_Game } from './game';
import { gameReducer } from './game-reducer';
import { T_GameState } from './types';

const defaultGameState: T_GameState = {
    cameraDirection: 'up',
};

export const CTX_GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [gameState, gameDispatch] = useReducer(gameReducer, defaultGameState);

    return (
        <CTX_Game.Provider value={{ gameState, gameDispatch }}>
            {children}
        </CTX_Game.Provider>
    );
};
