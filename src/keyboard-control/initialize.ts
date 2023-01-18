import { TKeyboardControlCallbackPayload, TKeyboardControlKey } from './types';
import { keyboardControlEvents, mapKeyboardKeyToEvent } from './utils';

function handleKeyboardEvent(
    event: KeyboardEvent,
    callbackPayload: TKeyboardControlCallbackPayload,
) {
    const keyboardEvent =
        mapKeyboardKeyToEvent[event.code as TKeyboardControlKey];
    keyboardControlEvents.trigger('default', keyboardEvent, callbackPayload);
}

function initializeKeyboardControl() {
    window.addEventListener('keydown', (event: KeyboardEvent) =>
        handleKeyboardEvent(event, { isPressed: true }),
    );
    window.addEventListener('keyup', (event: KeyboardEvent) =>
        handleKeyboardEvent(event, { isPressed: false }),
    );
}

initializeKeyboardControl();
