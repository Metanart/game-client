import { useContext } from 'react';

import { CTX_Game } from './game';

export const useGameContext = () => useContext(CTX_Game);
