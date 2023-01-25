import { CL_Events } from 'classes/common/events/events';

import {
    T_ControlCallbackPayload,
    T_ControlContextId,
    T_ControlEventId,
    T_ControlKeyId,
} from './types';

const CONTEXT_ACTION_CALLBACK_ID = 'CONTEXT_ACTION_CALLBACK_ID';

export const mapControlKeyIdToEventId: Record<
    T_ControlKeyId,
    T_ControlEventId
> = {
    KeyW: 'moveUp',
    KeyA: 'moveLeft',
    KeyS: 'moveDown',
    KeyD: 'moveRight',
    KeyE: 'contextAction',
};

export const ControlEvents = new CL_Events<
    T_ControlContextId,
    T_ControlEventId,
    T_ControlCallbackPayload
>();

export const handleSubscribeContextAction = (
    handleContextAction: (isPressed: boolean) => void,
) => {
    ControlEvents.subscribe(
        'default',
        'contextAction',
        ({ isPressed }) => handleContextAction(isPressed),
        CONTEXT_ACTION_CALLBACK_ID,
    );
};

export const handleUnsubscribeContextAction = (
    handleContextAction: (isPressed: boolean) => void,
) => {
    handleContextAction(false);
    ControlEvents.unsubscribe(
        'default',
        'contextAction',
        CONTEXT_ACTION_CALLBACK_ID,
    );
};

export const checkIfControlEventIsRepeatable = (eventId: T_ControlEventId) => {
    switch (eventId) {
        case 'contextAction':
            return false;
        default:
            return true;
    }
};
