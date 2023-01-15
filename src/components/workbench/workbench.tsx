import { ComponentProps, FC } from 'react';

import { BoxProps, useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

import '@react-three/fiber';

type BodyProps = BoxProps;
type MeshProps = ComponentProps<typeof Box>;

const meshProps: MeshProps = {
    args: [1, 4, 6],
    position: [0, 2, 2],
    rotation: [0, Math.PI / 2, 0],
};

const bodyProps: BodyProps = {
    mass: 0,
    collisionFilterGroup: 2,
    collisionFilterMask: 1,
    ...(meshProps as BodyProps),
};

export const Workbench: FC = () => {
    const [mesh] = useBox(() => bodyProps);

    return <Box ref={mesh} {...meshProps} />;
};
