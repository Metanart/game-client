export type TControlContextId = 'default';

export type TControlKeyId = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD' | 'KeyE';

export type TControlEventId =
    | 'moveUp'
    | 'moveLeft'
    | 'moveDown'
    | 'moveRight'
    | 'contextAction';

export type TControlCallbackPayload = { isPressed: boolean };
