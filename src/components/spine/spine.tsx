import React, { FC, useEffect, useRef, useState } from 'react';

import { Mesh, Object3D } from 'three';

import { SkeletonMesh } from '@esotericsoftware/spine-threejs';
import { useFrame } from '@react-three/fiber';

import { ESpines } from 'classes/spine/enums';

import { useSpineAsset } from './use-spine-asset';

const animations = ['walk', 'gun-grab', 'gun-holster', 'jump', 'roar'];

export const Spine: FC = () => {
    const meshRef = useRef<Mesh | null>(null);
    const [skeletonMesh, setSkeletonMesh] = useState<SkeletonMesh | null>(null);

    const [animationCounter, setAnimationCounter] = useState<number>(0);

    console.log('[IKATASONOV]:', animations.length);

    window.addEventListener('keydown', (event) => {
        if (event.code === 'KeyD') {
            if (animationCounter === animations.length - 1) return;
            setAnimationCounter(animationCounter + 1);
        }

        if (event.code === 'KeyA') {
            if (animationCounter === 0) return;
            setAnimationCounter(animationCounter - 1);
        }
    });

    useEffect(() => {
        async function getSkeletonMesh() {
            const { skeletonMesh: loadedSkeletonMesh } = await useSpineAsset(ESpines.RAPTOR);
            loadedSkeletonMesh.state.setAnimation(0, animations[animationCounter], true);

            console.log('[IKATASONOV]:', loadedSkeletonMesh);

            setSkeletonMesh(loadedSkeletonMesh);
            meshRef.current?.add(loadedSkeletonMesh as unknown as Object3D);
        }

        if (meshRef && !skeletonMesh) {
            getSkeletonMesh();
        }
    }, []);

    useFrame((state, delta) => {
        skeletonMesh?.update(delta);
    });

    useEffect(() => {
        skeletonMesh?.state?.setAnimation(0, animations[animationCounter], true);
    }, [animationCounter]);

    return (
        <mesh position={[0, 1, 0]} ref={meshRef}>
            <boxGeometry attach={'geometry'} args={[1, 1, 1]} />
        </mesh>
    );
};
