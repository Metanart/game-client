import { FC, useEffect, useRef } from 'react';

import { Mesh } from 'three';

import { Box } from '@react-three/drei';

import '@react-three/fiber';

export const Workbench: FC = () => {
    const workbench = useRef<Mesh | null>(null);

    useEffect(() => {
        workbench.current!.layers.set(0);
    }, [workbench.current]);

    return <Box ref={workbench} args={[1, 2, 4]} position={[4, 1, 0]} />;
};
