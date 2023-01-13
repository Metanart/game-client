import { ComponentProps, FC, useEffect, useState } from 'react';

import { BoxProps, useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

import { setupPlayerKeyboardEvents } from './utils';

type PlayerBodyProps = BoxProps;
type PlayerMeshProps = ComponentProps<typeof Box>;

const playerMeshProps: PlayerMeshProps = {
    args: [1, 2, 1],
    position: [0, 1, 0],
};

const playerBodyProps: PlayerBodyProps = {
    mass: 90,
    ...(playerMeshProps as PlayerBodyProps),
};

export const PlayerBody: FC = () => {
    const [isMovingUp, setIsMovingUp] = useState(false);
    const [isMovingDown, setIsMovingDown] = useState(false);
    const [isMovingLeft, setIsMovingLeft] = useState(false);
    const [isMovingRight, setIsMovingRight] = useState(false);

    const [playerBodyRef] = useBox(() => playerBodyProps);

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

    return <Box ref={playerBodyRef} {...playerMeshProps} />;
};
