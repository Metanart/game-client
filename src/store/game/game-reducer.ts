import { TGameAction, TGameState } from './types';

export function gameReducer(state: TGameState, action: TGameAction) {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.payload };
    }
}
