import { FC } from 'react';

import { useSphere } from '@react-three/cannon';
import { Sphere } from '@react-three/drei';

import { CollisionGroups } from 'enums/collision-groups';

import { SphereBodyProps, SphereMeshProps } from 'types/cannon';

import { Materials } from 'tokens/materials';

import { usePlayerBodyControl } from './hooks/use-player-body-control';
import { usePlayerMaterialsRelations } from './hooks/use-player-materials-relations';

const meshProps: SphereMeshProps = {
    args: [0.5],
    position: [0, 0.5, 0],
};

const bodyProps: SphereBodyProps = {
    mass: 90,
    type: 'Dynamic',
    fixedRotation: true,
    material: Materials.PLAYER,
    collisionFilterGroup: CollisionGroups.PHYSICAL_OBJECTS,
    collisionFilterMask: CollisionGroups.PHYSICAL_OBJECTS,
    ...(meshProps as SphereBodyProps),
};

const triggerProps: SphereBodyProps = {
    mass: 0,
    type: 'Kinematic',
    fixedRotation: true,
    isTrigger: true,
    collisionFilterGroup: CollisionGroups.TRIGGER_AREAS,
    collisionFilterMask: CollisionGroups.TRIGGER_AREAS,
    ...(meshProps as SphereBodyProps),
};

export const PlayerBody: FC = () => {
    const [bodyMesh, body] = useSphere(() => bodyProps);
    const [_, trigger] = useSphere(() => triggerProps);

    usePlayerBodyControl(body);
    usePlayerMaterialsRelations();

    if (body)
        body.position.subscribe((event) => {
            trigger.position.set(...event);
        });

    return <Sphere ref={bodyMesh} {...meshProps} />;
};
