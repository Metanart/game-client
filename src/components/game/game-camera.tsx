import { FC, MutableRefObject, useRef } from 'react';

import { CameraHelper, Object3D } from 'three';

import { OrthographicCamera, useHelper } from '@react-three/drei';
import { OrthographicCameraProps } from '@react-three/fiber';

import { GAME_DEBUG_CONFIG } from 'components/game/config';

import { useGameContext } from 'store/game/hooks';

export const CM_GameCamera: FC = () => {
    const { gameState } = useGameContext();

    const cameraRef = useRef<Object3D>(null);

    if (GAME_DEBUG_CONFIG.showCameraHelper)
        useHelper(cameraRef as MutableRefObject<Object3D>, CameraHelper);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const cameraArgs = [
        screenHeight,
        screenWidth,
        screenHeight,
        screenWidth,
        1,
        450,
    ] as OrthographicCameraProps['args'];

    const cameraDistance = 250;

    const getCameraDirectionProps: () => {
        position: OrthographicCameraProps['position'];
        rotation: OrthographicCameraProps['rotation'];
    } = () => {
        switch (gameState.cameraDirection) {
            default:
            case 'up':
                return {
                    position: [0, cameraDistance, cameraDistance],
                    rotation: [-Math.PI / 4, 0, 0],
                };
            case 'left':
                return {
                    position: [-cameraDistance, cameraDistance, 0],
                    rotation: [-Math.PI / 2, -Math.PI / 4, -Math.PI / 2],
                };
            case 'down':
                return {
                    position: [0, cameraDistance, -cameraDistance],
                    rotation: [Math.PI / 4, Math.PI, 0],
                };
            case 'right':
                return {
                    position: [cameraDistance, cameraDistance, 0],
                    rotation: [-Math.PI / 2, Math.PI / 4, Math.PI / 2],
                };
        }
    };

    const { position, rotation } = getCameraDirectionProps();

    return (
        <OrthographicCamera
            makeDefault={!GAME_DEBUG_CONFIG.useDevelopersCamera}
            ref={cameraRef}
            args={cameraArgs}
            position={position}
            rotation={rotation}
            zoom={30}
        />
    );
};
