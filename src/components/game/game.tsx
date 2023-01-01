import { FC, ReactNode } from 'react';

import { Canvas } from '@react-three/fiber';

import { Vector3 } from 'three/src/Three';

const cameraConfig = {
    fov: 50,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: 300,
    position: new Vector3(-30, 30, 0),
};

export const Game: FC<{ children?: ReactNode }> = (props) => <Canvas camera={cameraConfig}>{props.children}</Canvas>;
