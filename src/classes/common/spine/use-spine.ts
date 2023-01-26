import { SkeletonMesh } from '@esotericsoftware/spine-threejs';

import { E_Spines } from 'classes/common/spine/enums';
import { CL_SpineAssetsManager } from 'classes/common/spine/spine-assets-manager';

export const useSpine = async (spineId: E_Spines) => {
    const assetManager = new CL_SpineAssetsManager(E_Spines.RAPTOR);
    await assetManager.load();
    const skeletonMesh = assetManager.getSkeletonMesh() as SkeletonMesh;

    skeletonMesh.rotateX(-Math.PI / 8);
    skeletonMesh.scale.x = -1;
    skeletonMesh.zOffset = 0.005;

    return {
        skeletonMesh,
    };
};
