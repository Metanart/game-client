export type TKeyboardControlContext = 'default';

export type TKeyboardControlKey = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD';

export type TKeyboardControlEvent =
    | 'moveUp'
    | 'moveLeft'
    | 'moveDown'
    | 'moveRight';

export type TKeyboardControlCallbackPayload = { isPressed: boolean };
