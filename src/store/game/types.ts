import { Dispatch } from 'react';

import { TDirection4 } from 'types/generic';

export type TGameActionUpdate = { type: 'update'; payload: TGameState };

export type TGameAction = TGameActionUpdate;

export type TGameDispatch = Dispatch<TGameAction>;

export type TGameState = {
    cameraDirection: TDirection4;
};
