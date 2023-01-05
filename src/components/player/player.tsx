import { FC, Fragment, useEffect, useRef, useState } from 'react';

import { Euler, Material, Mesh, Object3D, RepeatWrapping, Vector3 } from 'three';

import { Box, Gltf, MeshWobbleMaterial, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { TEXTURES_PATH } from 'constants/paths';

import { Colors } from 'tokens/colors';

import { TDirection4, TDirection8, TDirectionPlayer } from 'types';

import { useRaycaster } from 'hooks/use-raycaster';
import { useGameContext } from 'store/game/hooks';

export const Player: FC = () => {
    const texture = useTexture(TEXTURES_PATH + '/dice-texture.png');
    const { gameState } = useGameContext();
    const meshRef = useRef<Mesh | null>(null);
    const { getIntersections } = useRaycaster(meshRef.current);
    const body = meshRef.current;

    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);

    const getPlayerDirection: () => TDirectionPlayer = () => {
        if (isMovingUp && isMovingLeft) return 'upLeft';
        if (isMovingUp && isMovingRight) return 'upRight';

        if (isMovingDown && isMovingLeft) return 'downLeft';
        if (isMovingDown && isMovingRight) return 'downRight';

        if (isMovingUp) return 'up';
        if (isMovingLeft) return 'left';
        if (isMovingDown) return 'down';
        if (isMovingRight) return 'right';

        return 'none';
    };

    const cameraDirection = gameState.cameraDirection;
    const playerDirection: TDirectionPlayer = getPlayerDirection();

    const setupKeyboardEvents = () => {
        window.addEventListener('keydown', (event) => {
            if (!event.repeat) {
                switch (event.code) {
                    case 'KeyW':
                        setIsMovingUp(true);
                        break;

                    case 'KeyA':
                        setIsMovingLeft(true);
                        break;

                    case 'KeyS':
                        setIsMovingDown(true);
                        break;

                    case 'KeyD':
                        setIsMovingRight(true);
                        break;
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'KeyW') setIsMovingUp(false);
            if (event.code === 'KeyA') setIsMovingLeft(false);
            if (event.code === 'KeyS') setIsMovingDown(false);
            if (event.code === 'KeyD') setIsMovingRight(false);
        });
    };

    useEffect(() => setupKeyboardEvents(), []);

    const updateRotation = () => {
        const angle = Math.PI / 4;

        switch (playerDirection) {
            case 'upLeft':
                body?.rotation.set(0, angle, 0);
                break;
            case 'upRight':
                body?.rotation.set(0, -angle, 0);
                break;
            case 'downLeft':
                body?.rotation.set(0, angle * 3, 0);
                break;
            case 'downRight':
                body?.rotation.set(0, -angle * 3, 0);
                break;
            case 'up':
                body?.rotation.set(0, angle * 4, 0);
                break;
            case 'left':
                body?.rotation.set(0, -angle * 2, 0);
                break;
            case 'down':
                body?.rotation.set(0, angle * 4, 0);
                break;
            case 'right':
                body?.rotation.set(0, -angle * 2, 0);
                break;
            case 'none':
                break;
        }
    };

    console.log(cameraDirection);

    function getPositionAxies(position: Object3D['position'], cameraDirection: TDirection4) {
        const updateZOffset = (offset: number) => position.setZ(position.z + offset);
        const updateXOffset = (offset: number) => position.setX(position.x + offset);
        const updateZOffsetNegative = (offset: number) => position.setZ(position.z - offset);
        const updateXOffsetNegative = (offset: number) => position.setX(position.x - offset);

        switch (cameraDirection) {
            case 'up':
                return {
                    updateVerticalOffset: updateZOffset,
                    updateHorizontalOffset: updateXOffset,
                };
            case 'left':
                return {
                    updateVerticalOffset: updateXOffsetNegative,
                    updateHorizontalOffset: updateZOffset,
                };
            case 'down':
                return {
                    updateVerticalOffset: updateZOffsetNegative,
                    updateHorizontalOffset: updateXOffsetNegative,
                };
            case 'right':
                return {
                    updateVerticalOffset: updateXOffset,
                    updateHorizontalOffset: updateZOffsetNegative,
                };
        }
    }

    const updatePosition = (delta: number) => {
        if (!body) return;

        const { updateVerticalOffset, updateHorizontalOffset } = getPositionAxies(body.position, cameraDirection);

        const speed = 2;
        const liniearOffset = speed * delta * Math.PI;
        const diagonaOffset = speed * delta * (Math.PI / 1.3);

        switch (playerDirection) {
            case 'upLeft':
                updateVerticalOffset(-diagonaOffset);
                updateHorizontalOffset(-diagonaOffset);
                break;
            case 'upRight':
                updateVerticalOffset(-diagonaOffset);
                updateHorizontalOffset(diagonaOffset);
                break;
            case 'downLeft':
                updateVerticalOffset(diagonaOffset);
                updateHorizontalOffset(-diagonaOffset);
                break;
            case 'downRight':
                updateVerticalOffset(diagonaOffset);
                updateHorizontalOffset(diagonaOffset);
                break;
            case 'up':
                updateVerticalOffset(-liniearOffset);
                break;
            case 'left':
                updateHorizontalOffset(-liniearOffset);
                break;
            case 'down':
                updateVerticalOffset(liniearOffset);
                break;
            case 'right':
                updateHorizontalOffset(liniearOffset);
                break;
        }
    };

    useFrame((state, delta) => {
        updatePosition(delta);
        updateRotation();
        getIntersections();
    });

    texture.repeat.set(0.5, 0.5);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    return (
        <Fragment>
            <Gltf
                position={[0, 2, 0]}
                ref={meshRef}
                src={TEXTURES_PATH + '/adam/adamHead.gltf'}
                receiveShadow
                castShadow
            />
        </Fragment>
    );
};
