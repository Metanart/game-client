import { FC, ReactNode } from 'react';

import { Vector3 } from 'three/src/Three';

import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';

const cameraConfig = {
    fov: 3,
    aspect: window.innerWidth / window.innerHeight,
    near: 1,
    far: 500,
    position: new Vector3(0, 100, 180),
};

export const Game: FC<{ children?: ReactNode }> = (props) => (
    <Canvas camera={cameraConfig}>
        <Physics>{props.children}</Physics>
    </Canvas>
);
