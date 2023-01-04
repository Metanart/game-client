import React, { FC, useEffect, useRef, useState } from 'react';

import { Mesh, Object3D, Raycaster, Vector3 } from 'three';

import { SkeletonMesh } from '@esotericsoftware/spine-threejs';
import { useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { ESpines } from 'classes/spine/enums';

import { useSpineAsset } from './use-spine-asset';

export const Spine: FC = () => {
    const [meshRef, bodyApi] = useBox(() => ({ args: [1, 2, 2], position: [0, 1, 0], type: 'Static' }));

    const collisionHandler = () => {
        const distance = 32;

        const raycaster = new Raycaster();

        const raycasterRays = [
            new Vector3(1, 0, 0),
            new Vector3(1, 0, -1),
            new Vector3(1, 0, 1),
            new Vector3(0, 0, -1),
            new Vector3(-1, 0, -1),
            new Vector3(0, 0, 1),
            new Vector3(-1, 0, 0),
            new Vector3(-1, 0, 1),
        ];

        for (let i = 0; i < raycasterRays.length; i += 1) {
            raycaster.set(meshRef.current?.position!, raycasterRays[i]);
        }
    };

    const [skeletonMesh, setSkeletonMesh] = useState<SkeletonMesh | null>(null);
    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);

    const setupKeyboardEvents = (skeletonMesh: SkeletonMesh) => {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'KeyW') {
                if (!event.repeat) {
                    setIsMovingUp(true);
                    skeletonMesh?.state.setAnimation(0, 'walk', true);
                }
            }

            if (event.code === 'KeyA') {
                if (!event.repeat) {
                    setIsMovingLeft(true);
                    skeletonMesh?.state.setAnimation(0, 'walk', true);
                    meshRef.current?.scale.setX(1);
                }
            }

            if (event.code === 'KeyS') {
                if (!event.repeat) {
                    setIsMovingDown(true);
                    skeletonMesh?.state.setAnimation(0, 'walk', true);
                }
            }

            if (event.code === 'KeyD') {
                if (!event.repeat) {
                    setIsMovingRight(true);
                    skeletonMesh?.state.setAnimation(0, 'walk', true);
                    meshRef.current?.scale.setX(-1);
                }
            }

            if (event.code === 'Space') {
                skeletonMesh?.state.setAnimation(0, 'jump', false);
            }

            if (event.code === 'ShiftLeft') {
                skeletonMesh?.state.setAnimation(0, 'roar', false);
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'KeyW') setIsMovingUp(false);
            if (event.code === 'KeyA') setIsMovingLeft(false);
            if (event.code === 'KeyS') setIsMovingDown(false);
            if (event.code === 'KeyD') setIsMovingRight(false);
        });
    };

    window.addEventListener('keyup', (event) => {});

    useEffect(() => {
        async function getSkeletonMesh() {
            const { skeletonMesh: loadedSkeletonMesh } = await useSpineAsset(ESpines.RAPTOR);
            setSkeletonMesh(loadedSkeletonMesh);
            meshRef.current?.add(loadedSkeletonMesh as unknown as Object3D);
            setupKeyboardEvents(loadedSkeletonMesh);
        }

        if (meshRef && !skeletonMesh) {
            getSkeletonMesh();
        }
    }, []);

    useFrame(({ clock }, delta) => {
        skeletonMesh?.update(delta);

        collisionHandler();

        if (isMovingUp && isMovingLeft) {
            meshRef.current?.position.setZ(meshRef.current.position.z - (2 * delta * Math.PI) / 4);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }
        if (isMovingUp && isMovingRight) {
            meshRef.current?.position.setZ(meshRef.current.position.z - (2 * delta * Math.PI) / 4);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }

        if (isMovingDown && isMovingLeft) {
            meshRef.current?.position.setZ(meshRef.current.position.z + (2 * delta * Math.PI) / 4);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }
        if (isMovingDown && isMovingRight) {
            meshRef.current?.position.setZ(meshRef.current.position.z + (2 * delta * Math.PI) / 4);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }

        if (isMovingUp) {
            meshRef.current?.position.setZ(meshRef.current.position.z - 2 * delta * Math.PI);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }
        if (isMovingLeft) {
            meshRef.current?.position.setX(meshRef.current.position.x - 2 * delta * Math.PI);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }
        if (isMovingDown) {
            meshRef.current?.position.setZ(meshRef.current.position.z + 2 * delta * Math.PI);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }
        if (isMovingRight) {
            meshRef.current?.position.setX(meshRef.current.position.x + 2 * delta * Math.PI);
            bodyApi.position.copy(meshRef.current?.position as Vector3);
        }
    });

    return <Box args={[0.5, 0.5, 0.5]} ref={meshRef} />;
};
