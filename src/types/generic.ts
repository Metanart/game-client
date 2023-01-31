export type T_Size = [height: number, width: number];

export type T_Coords = [rowIndex: number, colIndex: number];

export type T_Position = [top: number, left: number];

export type T_Doublet = [a: number, b: number];

export type T_Triplet = [a: number, b: number, c: number];

export type T_Quadriplet = [a: number, b: number, c: number, d: number];

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
