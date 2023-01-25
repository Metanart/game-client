import { FC } from 'react';

import { useSphere } from '@react-three/cannon';
import { Sphere } from '@react-three/drei';

import { E_CollisionGroups } from 'enums/collision-groups';
import { E_Materials } from 'enums/materials';

import { T_SphereBodyProps, T_SphereMeshProps } from 'types/cannon';

import { usePlayerContactMaterials } from './hooks/use-player-contact-materials';
import { usePlayerControl } from './hooks/use-player-control';

const meshProps: T_SphereMeshProps = {
    args: [0.5],
    position: [0, 0.5, 0],
};

const bodyProps: T_SphereBodyProps = {
    mass: 90,
    type: 'Dynamic',
    fixedRotation: true,
    material: E_Materials.PLAYER,
    collisionFilterGroup: E_CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: E_CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as T_SphereBodyProps),
};

const triggerProps: T_SphereBodyProps = {
    mass: 0,
    type: 'Kinematic',
    fixedRotation: true,
    isTrigger: true,
    collisionFilterGroup: E_CollisionGroups.TRIGGER_AREAS,
    collisionFilterMask: E_CollisionGroups.TRIGGER_AREAS,
    ...(meshProps as T_SphereBodyProps),
};

export const C3D_Player: FC = () => {
    const [bodyMesh, body] = useSphere(() => bodyProps);
    const [_, trigger] = useSphere(() => triggerProps);

    usePlayerControl(body);
    usePlayerContactMaterials();

    if (body)
        body.position.subscribe((event) => {
            trigger.position.set(...event);
        });

    return <Sphere ref={bodyMesh} {...meshProps} />;
};
