import { FC, ReactNode } from 'react';

import { Physics } from '@react-three/cannon';
import { Canvas } from '@react-three/fiber';

import { CN_GameCamera } from './game-camera';
import { CN_GameDevtools } from './game-devtools';
import { CN_GameLight } from './game-ligth';
import { CN_GameScene } from './game-scene';

export const CN_Game: FC<{ children?: ReactNode }> = (props) => (
    <Canvas>
        <CN_GameCamera />
        <CN_GameLight />
        <Physics>
            <CN_GameDevtools>
                <CN_GameScene />
                {props.children}
            </CN_GameDevtools>
        </Physics>
    </Canvas>
);
