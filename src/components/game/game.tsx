import { FC, ReactNode } from 'react';

import { Canvas } from '@react-three/fiber';

import { GameCamera } from 'components/game/game-camera';
import { GameDevtools } from 'components/game/game-devtools';
import { GameLight } from 'components/game/game-ligth';
import { GameMap } from 'components/game/game-map';

export const Game: FC<{ children?: ReactNode }> = (props) => (
    <Canvas>
        <GameCamera />
        <GameLight />
        <GameDevtools>
            <GameMap />
            {props.children}
        </GameDevtools>
    </Canvas>
);
