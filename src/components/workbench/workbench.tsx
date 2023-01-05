import { FC } from 'react';

import { Box } from '@react-three/drei';

import '@react-three/fiber';

export const Workbench: FC = () => {
    return <Box args={[1, 1, 4]} position={[4, 1 / 2, 0]} />;
};
