import { useState } from 'react';

import { useFrame } from '@react-three/fiber';

import { ControlEvents } from 'control/utils';

import { T_PhysicalBody } from 'types/cannon';

export function usePlayerControl(playerBody: T_PhysicalBody) {
    const velocity = 5;
    const diagonalVelocity = 4;

    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);

    ControlEvents.subscribe('default', 'moveUp', ({ isPressed }) =>
        setIsMovingUp(isPressed),
    );

    ControlEvents.subscribe('default', 'moveLeft', ({ isPressed }) =>
        setIsMovingLeft(isPressed),
    );

    ControlEvents.subscribe('default', 'moveDown', ({ isPressed }) =>
        setIsMovingDown(isPressed),
    );

    ControlEvents.subscribe('default', 'moveRight', ({ isPressed }) =>
        setIsMovingRight(isPressed),
    );

    useFrame(() => {
        if (playerBody) {
            if (isMovingUp && isMovingLeft) {
                playerBody.velocity.set(
                    -diagonalVelocity,
                    0,
                    -diagonalVelocity,
                );
            } else if (isMovingUp && isMovingRight) {
                playerBody.velocity.set(diagonalVelocity, 0, -diagonalVelocity);
            } else if (isMovingDown && isMovingLeft) {
                playerBody.velocity.set(-diagonalVelocity, 0, diagonalVelocity);
            } else if (isMovingDown && isMovingRight) {
                playerBody.velocity.set(diagonalVelocity, 0, diagonalVelocity);
            } else if (isMovingUp) {
                playerBody.velocity.set(0, 0, -velocity);
            } else if (isMovingLeft) {
                playerBody.velocity.set(-velocity, 0, 0);
            } else if (isMovingDown) {
                playerBody.velocity.set(0, 0, velocity);
            } else if (isMovingRight) {
                playerBody.velocity.set(velocity, 0, 0);
            } else {
                playerBody.velocity.set(0, 0, 0);
            }
        }
    });
}
