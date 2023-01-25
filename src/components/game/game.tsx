import { FC, ReactNode } from 'react';

import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';

import { CM_GameCamera } from './game-camera';
import { CM_GameDevtools } from './game-devtools';
import { CM_GameLight } from './game-ligth';
import { CM_GameScene } from './game-scene';

export const CM_Game: FC<{ children?: ReactNode }> = (props) => (
    <Canvas>
        <CM_GameCamera />
        <CM_GameLight />
        <Physics>
            <CM_GameDevtools>
                <CM_GameScene />
                {props.children}
            </CM_GameDevtools>
        </Physics>
    </Canvas>
);
