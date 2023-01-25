import { Dispatch } from 'react';

import { T_Direction4 } from 'types/generic';

export type T_GameActionUpdate = { type: 'update'; payload: T_GameState };

export type T_GameAction = T_GameActionUpdate;

export type T_GameDispatch = Dispatch<T_GameAction>;

export type T_GameState = {
    cameraDirection: T_Direction4;
};
