import { FC } from 'react';

import {
    CollideEndEvent,
    useCompoundBody,
    useCylinder,
} from '@react-three/cannon';
import { Cylinder } from '@react-three/drei';

import { CollisionGroups } from 'enums/collision-groups';

export const Tree: FC = () => {
    const handleCollideEnd = (event: CollideEndEvent) => {};

    const [treeTrunkMesh, treeTrunkBody] = useCylinder(() => ({
        args: [0.5, 0.5, 3, 12],
        type: 'Static',
        mass: 0,
        position: [-2, 1.5, -2],
        collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
        collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
    }));

    const [treeTriggerMesh, treeTriggerBody] = useCylinder(() => ({
        args: [1, 1, 3, 12],
        type: 'Static',
        mass: 0,
        position: [-2, 1.5, -2],
        isTrigger: true,
        collisionFilterGroup: CollisionGroups.TRIGGER_AREAS,
        collisionFilterMask: CollisionGroups.TRIGGER_AREAS,
    }));

    return <Cylinder args={[0.5, 0.5, 3, 12]} ref={treeTrunkMesh}></Cylinder>;
};
