import React, { FC } from 'react';

import { useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

import '@react-three/fiber';

export const Workbench: FC = () => {
    const args = [1, 1, 4];
    const position = [4, 1 / 2, 0];

    const [ref, api] = useBox(() => ({ args, position, mass: 1, type: 'Static' }));

    return <Box ref={ref} args={args} position={position} />;
};
