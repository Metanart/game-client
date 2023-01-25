import { FC } from 'react';

import { usePlane } from '@react-three/cannon';
import { Plane } from '@react-three/drei';

import { E_CollisionGroups } from 'enums/collision-groups';
import { E_Materials } from 'enums/materials';

import { T_PlaneBodyProps, T_PlaneMeshProps } from 'types/cannon';

const meshProps: T_PlaneMeshProps = {
    args: [100, 100],
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
};

const bodyProps: T_PlaneBodyProps = {
    material: E_Materials.GROUND,
    collisionFilterGroup: E_CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: E_CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as T_PlaneBodyProps),
};

export const C3D_Map: FC = () => {
    const [bodyMesh] = usePlane(() => bodyProps);

    return <Plane ref={bodyMesh} {...meshProps} />;
};
