import { FC } from 'react';

import { useCylinder } from '@react-three/cannon';
import { Cylinder } from '@react-three/drei';

import {
    handleSubscribeContextAction,
    handleUnsubscribeContextAction,
} from 'control/utils';

import { CollisionGroups } from 'enums/collision-groups';

import { CylinderBodyProps, CylinderMeshProps } from 'types/cannon';

const handleContextAction = (isPressed: boolean) => {
    console.log(isPressed);
};

const handleCollideBegin = () =>
    handleSubscribeContextAction(handleContextAction);

const handleCollideEnd = () =>
    handleUnsubscribeContextAction(handleContextAction);

const meshProps: CylinderMeshProps = {
    args: [0.5, 0.5, 3, 12],
    position: [-2, 1.5, -2],
};

const bodyProps: CylinderBodyProps = {
    mass: 0,
    type: 'Static',
    collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as CylinderBodyProps),
};

const triggerProps: CylinderBodyProps = {
    mass: 0,
    type: 'Static',
    isTrigger: true,
    collisionFilterGroup: CollisionGroups.TRIGGER_AREAS,
    collisionFilterMask: CollisionGroups.TRIGGER_AREAS,
    onCollideBegin: handleCollideBegin,
    onCollideEnd: handleCollideEnd,
    ...(meshProps as CylinderBodyProps),
};

export const Tree: FC = () => {
    const [bodyMesh] = useCylinder(() => bodyProps);

    useCylinder(() => triggerProps);

    return <Cylinder ref={bodyMesh} {...meshProps} />;
};
