import { FC } from 'react';

import {
    CollideEndEvent,
    useCompoundBody,
    useCylinder,
} from '@react-three/cannon';
import { Cylinder } from '@react-three/drei';

export const Tree: FC = () => {
    const handleCollideEnd = (event: CollideEndEvent) => {};

    const [treeTrunkMesh, treeTrunkBody] = useCylinder(() => ({
        args: [1, 1, 3, 12],
        type: 'Static',
        mass: 0,
        position: [-2, 1.5, -2],
    }));

    const [treeTriggerMesh, treeTriggerBody] = useCylinder(() => ({
        args: [2, 2, 3, 12],
        type: 'Static',
        mass: 0,
        position: [-2, 1.5, -2],
        isTrigger: true,
    }));

    return <Cylinder args={[1, 1, 3, 12]} ref={treeTrunkMesh}></Cylinder>;
};
