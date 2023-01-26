import { T_GameAction, T_GameState } from './types';

export function gameReducer(state: T_GameState, action: T_GameAction) {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.payload };
    }
}
