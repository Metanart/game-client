import { useContactMaterial } from '@react-three/cannon';

import { Materials } from 'tokens/materials';

export const usePlayerMaterialsRelations = () => {
    useContactMaterial(Materials.PLAYER, Materials.GROUND, {
        friction: 0,
        restitution: 0,
    });

    useContactMaterial(Materials.PLAYER, Materials.WALL, {
        friction: 0,
        restitution: 0,
    });
};
