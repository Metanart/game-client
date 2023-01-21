import { Events } from 'classes/events/events';

import {
    TControlCallbackPayload,
    TControlContextId,
    TControlEventId,
    TControlKeyId,
} from './types';

const CONTEXT_ACTION_CALLBACK_ID = 'CONTEXT_ACTION_CALLBACK_ID';

export const mapControlKeyIdToEventId: Record<TControlKeyId, TControlEventId> =
    {
        KeyW: 'moveUp',
        KeyA: 'moveLeft',
        KeyS: 'moveDown',
        KeyD: 'moveRight',
        KeyE: 'contextAction',
    };

export const ControlEvents = new Events<
    TControlContextId,
    TControlEventId,
    TControlCallbackPayload
>();

export const handleContextActionSubscribe = (
    handleContextAction: (isPressed: boolean) => void,
) => {
    ControlEvents.subscribe(
        'default',
        'contextAction',
        ({ isPressed }) => handleContextAction(isPressed),
        CONTEXT_ACTION_CALLBACK_ID,
    );
};

export const handleContextActionUnsubscribe = () => {
    ControlEvents.unsubscribe(
        'default',
        'contextAction',
        CONTEXT_ACTION_CALLBACK_ID,
    );
};

export const checkIfControlEventIsRepeatable = (eventId: TControlEventId) => {
    switch (eventId) {
        case 'contextAction':
            return false;
        default:
            return true;
    }
};
