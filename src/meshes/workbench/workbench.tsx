import { FC } from 'react';

import { useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

import { T_BoxBodyProps, T_BoxMeshProps } from 'types/cannon';

import { E_CollisionGroups } from 'enums/collision-groups';

import '@react-three/fiber';

const meshProps: T_BoxMeshProps = {
    args: [1, 1, 2],
    position: [3, 1 / 2, 3],
    rotation: [0, Math.PI / 2, 0],
};

const bodyProps: T_BoxBodyProps = {
    mass: 0,
    collisionFilterGroup: E_CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: E_CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as T_BoxBodyProps),
};

export const MS_Workbench: FC = () => {
    const [bodyMesh] = useBox(() => bodyProps);

    return <Box ref={bodyMesh} {...meshProps} />;
};
