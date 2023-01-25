export type T_JsonSrc = `${string}.${'json'}`;

export type T_AtlasSrc = `${string}.${'atlas'}`;

export type T_ImageSrc = `${string}.${'png' | 'jpg' | 'jpeg'}`;

export type T_Direction4 = 'up' | 'left' | 'down' | 'right';

export type T_Direction8 =
    | T_Direction4
    | 'upLeft'
    | 'upRight'
    | 'downLeft'
    | 'downRight';

export type T_PlayerDirection = T_Direction8 | 'none';
