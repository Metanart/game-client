import { TControlCallbackPayload, TControlKeyId } from './types';
import { ControlEvents, mapControlKeyIdToEventId } from './utils';
import { checkIfControlEventIsRepeatable } from './utils';

function handleKeyboardEvent(
    keyboardEvent: KeyboardEvent,
    callbackPayload: TControlCallbackPayload,
) {
    const controlEventId =
        mapControlKeyIdToEventId[keyboardEvent.code as TControlKeyId];

    // If the event runs the first time,
    // or if it's a repeatable event and could be performed more than once
    const shouldTriggerEvent = Boolean(
        !keyboardEvent.repeat ||
            (keyboardEvent.repeat &&
                checkIfControlEventIsRepeatable(controlEventId)),
    );

    if (shouldTriggerEvent)
        ControlEvents.trigger('default', controlEventId, callbackPayload);
}

function initializeControl() {
    window.addEventListener('keydown', (event: KeyboardEvent) =>
        handleKeyboardEvent(event, { isPressed: true }),
    );
    window.addEventListener('keyup', (event: KeyboardEvent) =>
        handleKeyboardEvent(event, { isPressed: false }),
    );
}

initializeControl();
