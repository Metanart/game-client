import { useContactMaterial } from '@react-three/cannon';

import { E_Materials } from 'enums/materials';

export const usePlayerContactMaterials = () => {
    useContactMaterial(E_Materials.PLAYER, E_Materials.GROUND, {
        friction: 0,
        restitution: 0,
    });

    useContactMaterial(E_Materials.PLAYER, E_Materials.WALL, {
        friction: 0,
        restitution: 0,
    });
};
