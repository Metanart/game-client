import { FC } from 'react';

import { useCylinder } from '@react-three/cannon';
import { Cylinder } from '@react-three/drei';

import {
    handleSubscribeContextAction,
    handleUnsubscribeContextAction,
} from 'control/utils';

import { E_CollisionGroups } from 'enums/collision-groups';

import { T_CylinderBodyProps, T_CylinderMeshProps } from 'types/cannon';

const handleContextAction = (isPressed: boolean) => {
    console.log(isPressed);
};

const handleCollideBegin = () =>
    handleSubscribeContextAction(handleContextAction);

const handleCollideEnd = () =>
    handleUnsubscribeContextAction(handleContextAction);

const meshProps: T_CylinderMeshProps = {
    args: [0.5, 0.5, 3, 12],
    position: [-2, 1.5, -2],
};

const bodyProps: T_CylinderBodyProps = {
    mass: 0,
    type: 'Static',
    collisionFilterGroup: E_CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: E_CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as T_CylinderBodyProps),
};

const triggerProps: T_CylinderBodyProps = {
    mass: 0,
    type: 'Static',
    isTrigger: true,
    collisionFilterGroup: E_CollisionGroups.TRIGGER_AREAS,
    collisionFilterMask: E_CollisionGroups.TRIGGER_AREAS,
    onCollideBegin: handleCollideBegin,
    onCollideEnd: handleCollideEnd,
    ...(meshProps as T_CylinderBodyProps),
};

export const C3D_Tree: FC = () => {
    const [bodyMesh] = useCylinder(() => bodyProps);

    useCylinder(() => triggerProps);

    return <Cylinder ref={bodyMesh} {...meshProps} />;
};
