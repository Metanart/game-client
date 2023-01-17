import { ComponentProps, FC, useEffect, useState } from 'react';

import {
    CollideEndEvent,
    SphereProps,
    useBox,
    useLockConstraint,
    useSphere,
} from '@react-three/cannon';
import { Box, Sphere } from '@react-three/drei';

import { Materials } from 'tokens/materials';

import { usePlayerMaterialsRelations } from './hooks';
import { setupPlayerKeyboardEvents } from './utils';

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
        position: [0, 1, 0],
    };

    const physicalBodyProps: SphereBodyProps = {
        type: 'Dynamic',
        mass: 90,
        fixedRotation: true,
        material: Materials.PLAYER,
        linearDamping: 0,
        angularDamping: 0,
        onCollideEnd: (event: CollideEndEvent) => {
            physicalBody.velocity.set(0, 0, 0);
        },
        ...(physicalMeshProps as SphereBodyProps),
    };

    const triggerBodyProps: SphereBodyProps = {
        type: 'Dynamic',
        mass: 0,
        isTrigger: true,
        args: [1],
    };

    const [physicalMesh, physicalBody] = useSphere(() => physicalBodyProps);
    const [triggerMesh, triggerBody] = useSphere(() => triggerBodyProps);

    useEffect(
        () =>
            setupPlayerKeyboardEvents({
                setIsMovingUp,
                setIsMovingLeft,
                setIsMovingDown,
                setIsMovingRight,
            }),
        [],
    );

    usePlayerMaterialsRelations();

    if (physicalBody) {
        if (isMovingUp && isMovingLeft) {
            physicalBody.velocity.set(diagonalVelocity, 0, diagonalVelocity);
        } else if (isMovingUp && isMovingRight) {
            physicalBody.velocity.set(-diagonalVelocity, 0, diagonalVelocity);
        } else if (isMovingDown && isMovingLeft) {
            physicalBody.velocity.set(diagonalVelocity, 0, -diagonalVelocity);
        } else if (isMovingDown && isMovingRight) {
            physicalBody.velocity.set(-diagonalVelocity, 0, -diagonalVelocity);
        } else if (isMovingUp) {
            physicalBody.velocity.set(0, 0, velocity);
        } else if (isMovingLeft) {
            physicalBody.velocity.set(velocity, 0, 0);
        } else if (isMovingDown) {
            physicalBody.velocity.set(0, 0, -velocity);
        } else if (isMovingRight) {
            physicalBody.velocity.set(-velocity, 0, 0);
        } else {
            physicalBody.velocity.set(0, 0, 0);
        }
    }

    return <Sphere args={[0.5]} ref={physicalMesh}></Sphere>;
};
