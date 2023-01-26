export type T_ControlContextId = 'default';

export type T_ControlKeyId = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD' | 'KeyE';

export type T_ControlEventId =
    | 'moveUp'
    | 'moveLeft'
    | 'moveDown'
    | 'moveRight'
    | 'contextAction';

export type T_ControlCallbackPayload = { isPressed: boolean };
