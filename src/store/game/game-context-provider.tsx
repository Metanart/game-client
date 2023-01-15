import { createContext, FC, ReactNode, useReducer } from 'react';

import { GameContext } from './game-context';
import { gameReducer } from './game-reducer';
import { TGameState } from './types';

const defaultGameState: TGameState = {
    cameraDirection: 'up',
};

export const GameContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [gameState, gameDispatch] = useReducer(gameReducer, defaultGameState);

    return (
        <GameContext.Provider value={{ gameState, gameDispatch }}>
            {children}
        </GameContext.Provider>
    );
};
