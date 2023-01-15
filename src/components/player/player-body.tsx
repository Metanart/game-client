import { ComponentProps, FC, useEffect, useState } from 'react';

import {
    CollideEndEvent,
    SphereProps,
    useContactMaterial,
    useSphere,
} from '@react-three/cannon';
import { Sphere } from '@react-three/drei';

import { Materials } from 'tokens/materials';

import { usePlayerMaterialsRelations } from './hooks';
import { setupPlayerKeyboardEvents } from './utils';

type BodyProps = SphereProps;
type MeshProps = ComponentProps<typeof Sphere>;

const velocity = 5;
const diagonalVelocity = 4;

export const PlayerBody: FC = () => {
    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);

    const meshProps: MeshProps = {
        args: [0.5],
        position: [0, 1, 0],
    };

    usePlayerMaterialsRelations();

    const bodyProps: BodyProps = {
        type: 'Dynamic',
        mass: 90,
        fixedRotation: true,
        material: Materials.PLAYER,
        onCollideEnd: (event: CollideEndEvent) => {
            body.velocity.set(0, 0, 0);
        },
        ...(meshProps as BodyProps),
    };

    const [mesh, body] = useSphere(() => bodyProps);

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

    if (mesh.current) {
        if (isMovingUp && isMovingLeft) {
            body.velocity.set(diagonalVelocity, 0, diagonalVelocity);
        } else if (isMovingUp && isMovingRight) {
            body.velocity.set(-diagonalVelocity, 0, diagonalVelocity);
        } else if (isMovingDown && isMovingLeft) {
            body.velocity.set(diagonalVelocity, 0, -diagonalVelocity);
        } else if (isMovingDown && isMovingRight) {
            body.velocity.set(-diagonalVelocity, 0, -diagonalVelocity);
        } else if (isMovingUp) {
            body.velocity.set(0, 0, velocity);
        } else if (isMovingLeft) {
            body.velocity.set(velocity, 0, 0);
        } else if (isMovingDown) {
            body.velocity.set(0, 0, -velocity);
        } else if (isMovingRight) {
            body.velocity.set(-velocity, 0, 0);
        } else {
            body.velocity.set(0, 0, 0);
        }
    }

    return <Sphere ref={mesh} {...meshProps} />;
};
