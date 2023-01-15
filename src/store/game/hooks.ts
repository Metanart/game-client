import { useContext } from 'react';

import { GameContext } from './game-context';

export const useGameContext = () => useContext(GameContext);
