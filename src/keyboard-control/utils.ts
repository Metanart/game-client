import { Events } from 'classes/events/events';

import {
    TKeyboardControlCallbackPayload,
    TKeyboardControlContext,
    TKeyboardControlEvent,
    TKeyboardControlKey,
} from './types';

export const mapKeyboardKeyToEvent: Record<
    TKeyboardControlKey,
    TKeyboardControlEvent
> = {
    KeyW: 'moveUp',
    KeyA: 'moveLeft',
    KeyS: 'moveDown',
    KeyD: 'moveRight',
};

export const keyboardControlEvents = new Events<
    TKeyboardControlContext,
    TKeyboardControlEvent,
    TKeyboardControlCallbackPayload
>();
