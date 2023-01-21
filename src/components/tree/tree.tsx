import { FC } from 'react';

import { useCylinder } from '@react-three/cannon';
import { Cylinder } from '@react-three/drei';

import {
    handleContextActionSubscribe,
    handleContextActionUnsubscribe,
} from 'control/utils';

import { CollisionGroups } from 'enums/collision-groups';

const handleContextAction = (isPressed: boolean) => {
    console.log(isPressed);
};

const handleCollideBegin = () =>
    handleContextActionSubscribe(handleContextAction);

const handleCollideEnd = () => handleContextActionUnsubscribe();

export const Tree: FC = () => {
    const [treeTrunkMesh, treeTrunkBody] = useCylinder(() => ({
        args: [0.5, 0.5, 3, 12],
        type: 'Static',
        mass: 0,
        position: [-2, 1.5, -2],
        collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
        collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
        onCollideBegin: handleCollideBegin,
        onCollideEnd: handleCollideEnd,
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
