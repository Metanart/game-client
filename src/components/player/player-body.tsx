import { ComponentProps, FC, useState } from 'react';

import { CollideBeginEvent, SphereProps, useSphere } from '@react-three/cannon';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { Materials } from 'tokens/materials';

import { usePlayerMaterialsRelations } from './hooks';

import { CollisionGroups } from 'enums/collision-groups';
import { keyboardControlEvents } from 'keyboard-control/utils';

type SphereMeshProps = ComponentProps<typeof Sphere>;
type SphereBodyProps = SphereProps;

const velocity = 5;
const diagonalVelocity = 4;

export const PlayerBody: FC = () => {
    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);

    const physicalMeshProps: SphereMeshProps = {
        args: [0.5],
        position: [0, 0.5, 0],
    };

    const playerProps: SphereBodyProps = {
        type: 'Dynamic',
        mass: 90,
        fixedRotation: true,
        material: Materials.PLAYER,
        collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
        collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
        ...(physicalMeshProps as SphereBodyProps),
    };

    const triggerProps: SphereBodyProps = {
        type: 'Kinematic',
        mass: 0,
        fixedRotation: true,
        isTrigger: true,
        collisionFilterGroup: CollisionGroups.TRIGGER_AREAS,
        collisionFilterMask: CollisionGroups.TRIGGER_AREAS,
        onCollideBegin: (event: CollideBeginEvent) => {
            console.log(event);
        },
        ...(physicalMeshProps as SphereBodyProps),
    };

    const [playerMesh, playerBody] = useSphere(() => playerProps);
    const [triggerMesh, triggerBody] = useSphere(() => triggerProps);

    usePlayerMaterialsRelations();

    if (playerBody) {
        playerBody.position.subscribe((event) => {
            const [x, y, z] = event;
            triggerBody.position.set(x, y, z);
        });
    }

    keyboardControlEvents.subscribe('default', 'moveUp', ({ isPressed }) =>
        setIsMovingUp(isPressed),
    );

    keyboardControlEvents.subscribe('default', 'moveLeft', ({ isPressed }) =>
        setIsMovingLeft(isPressed),
    );

    keyboardControlEvents.subscribe('default', 'moveDown', ({ isPressed }) =>
        setIsMovingDown(isPressed),
    );

    keyboardControlEvents.subscribe('default', 'moveRight', ({ isPressed }) =>
        setIsMovingRight(isPressed),
    );

    useFrame((state, delta) => {
        if (playerBody) {
            if (isMovingUp && isMovingLeft) {
                playerBody.velocity.set(diagonalVelocity, 0, diagonalVelocity);
            } else if (isMovingUp && isMovingRight) {
                playerBody.velocity.set(-diagonalVelocity, 0, diagonalVelocity);
            } else if (isMovingDown && isMovingLeft) {
                playerBody.velocity.set(diagonalVelocity, 0, -diagonalVelocity);
            } else if (isMovingDown && isMovingRight) {
                playerBody.velocity.set(
                    -diagonalVelocity,
                    0,
                    -diagonalVelocity,
                );
            } else if (isMovingUp) {
                playerBody.velocity.set(0, 0, velocity);
            } else if (isMovingLeft) {
                playerBody.velocity.set(velocity, 0, 0);
            } else if (isMovingDown) {
                playerBody.velocity.set(0, 0, -velocity);
            } else if (isMovingRight) {
                playerBody.velocity.set(-velocity, 0, 0);
            } else {
                playerBody.velocity.set(0, 0, 0);
            }
        }
    });

    return <Sphere args={[0.5]} ref={playerMesh}></Sphere>;
};
