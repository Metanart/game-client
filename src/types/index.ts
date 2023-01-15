export type TJsonSrc = `${string}.${'json'}`;

export type TAtlasSrc = `${string}.${'atlas'}`;

export type TImageSrc = `${string}.${'png' | 'jpg' | 'jpeg'}`;

export type TVector2 = [x: number, y: number];

export type TVector3 = [x: number, y: number, z: number];

export type TDirection4 = 'up' | 'left' | 'down' | 'right';

export type TDirection8 =
    | TDirection4
    | 'upLeft'
    | 'upRight'
    | 'downLeft'
    | 'downRight';

export type TDirectionPlayer = TDirection8 | 'none';
