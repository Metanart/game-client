import { ComponentProps, FC } from 'react';

import { BoxProps, useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

import '@react-three/fiber';
import { CollisionGroups } from 'enums/collision-groups';

type BodyProps = BoxProps;
type MeshProps = ComponentProps<typeof Box>;

const meshProps: MeshProps = {
    args: [1, 1, 2],
    position: [3, 1 / 2, 3],
    rotation: [0, Math.PI / 2, 0],
};

const bodyProps: BodyProps = {
    mass: 0,
    collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as BodyProps),
};

export const Workbench: FC = () => {
    const [mesh] = useBox(() => bodyProps);

    return <Box ref={mesh} {...meshProps} />;
};
