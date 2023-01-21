import { FC } from 'react';

import { useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

import { CollisionGroups } from 'enums/collision-groups';

import { BoxBodyProps, BoxMeshProps } from 'types/cannon';

import '@react-three/fiber';

const meshProps: BoxMeshProps = {
    args: [1, 1, 2],
    position: [3, 1 / 2, 3],
    rotation: [0, Math.PI / 2, 0],
};

const bodyProps: BoxBodyProps = {
    mass: 0,
    collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as BoxBodyProps),
};

export const Workbench: FC = () => {
    const [bodyMesh] = useBox(() => bodyProps);

    return <Box ref={bodyMesh} {...meshProps} />;
};
