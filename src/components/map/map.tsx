import { FC } from 'react';

import { usePlane } from '@react-three/cannon';
import { Plane } from '@react-three/drei';

import { Materials } from 'tokens/materials';

import { CollisionGroups } from 'enums/collision-groups';

export const Map: FC = () => {
    const [mesh, body] = usePlane(() => ({
        args: [100, 100],
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0],
        material: Materials.GROUND,
        collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
        collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
    }));

    return <Plane ref={mesh} />;
};
