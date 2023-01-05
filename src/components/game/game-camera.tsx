import { FC, MutableRefObject, useRef, useState } from 'react';

import { _SRGBAFormat, CameraHelper, Object3D, OrthographicCamera as OrthographicCamera3, Vector3 } from 'three';

import { OrthographicCamera } from '@react-three/drei';
import { useHelper } from '@react-three/drei';
import { OrthographicCameraProps, useThree } from '@react-three/fiber';

import { debugConfig } from 'constants/debug-config';

import { useGameContext } from 'store/game/hooks';

type TCameraSide = 'up' | 'left' | 'down' | 'right';

export const GameCamera: FC = () => {
    const { scene } = useThree();
    const { gameState } = useGameContext();

    const cameraRef = useRef<Object3D>(null);
    const camera = cameraRef.current;

    useHelper(cameraRef as MutableRefObject<Object3D>, CameraHelper);

    let SCREEN_WIDTH = window.innerWidth;
    let SCREEN_HEIGHT = window.innerHeight;
    let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    const args = [SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH, 1, 450] as OrthographicCameraProps['args'];

    const distance = 250;

    const getCameraDirectionProps = (): {
        position: OrthographicCameraProps['position'];
        rotation: OrthographicCameraProps['rotation'];
    } => {
        switch (gameState.cameraDirection) {
            case 'up':
                return { position: [0, distance, distance], rotation: [-Math.PI / 4, 0, 0] };
            case 'left':
                return { position: [-distance, distance, 0], rotation: [-Math.PI / 2, -Math.PI / 4, -Math.PI / 2] };
            case 'down':
                return { position: [0, distance, -distance], rotation: [Math.PI / 4, Math.PI, 0] };
            case 'right':
                return { position: [distance, distance, 0], rotation: [-Math.PI / 2, Math.PI / 4, Math.PI / 2] };
        }
    };

    const { position, rotation } = getCameraDirectionProps();

    return (
        <OrthographicCamera
            makeDefault={!debugConfig.useDevelopersCamera}
            ref={cameraRef}
            args={args}
            position={position}
            rotation={rotation}
            zoom={30}
        />
    );
};
