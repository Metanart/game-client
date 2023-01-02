import { FC, ReactNode } from 'react';

import { Vector3 } from 'three/src/Three';

import { Canvas } from '@react-three/fiber';

const cameraConfig = {
    fov: 10,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: 1000,
    position: new Vector3(0, 100, 180),
};

export const Game: FC<{ children?: ReactNode }> = (props) => <Canvas camera={cameraConfig}>{props.children}</Canvas>;
