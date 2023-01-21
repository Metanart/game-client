import { FC } from 'react';

import { usePlane } from '@react-three/cannon';
import { Plane } from '@react-three/drei';

import { CollisionGroups } from 'enums/collision-groups';

import { PlaneBodyProps, PlaneMeshProps } from 'types/cannon';

import { Materials } from 'tokens/materials';

const meshProps: PlaneMeshProps = {
    args: [100, 100],
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
};

const bodyProps: PlaneBodyProps = {
    material: Materials.GROUND,
    collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as PlaneBodyProps),
};

export const Map: FC = () => {
    const [bodyMesh] = usePlane(() => bodyProps);

    return <Plane ref={bodyMesh} {...meshProps} />;
};
