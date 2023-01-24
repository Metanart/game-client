import { SkeletonMesh } from '@esotericsoftware/spine-threejs';

import { ESpines } from 'classes/common/spine/enums';
import { SpineAssetsManager } from 'classes/common/spine/spine-assets-manager';

export const useSpine = async (spineKey: ESpines) => {
    const assetManager = new SpineAssetsManager(ESpines.RAPTOR);
    await assetManager.load(spineKey);
    const skeletonMesh = assetManager.getSkeletonMesh() as SkeletonMesh;

    skeletonMesh.rotateX(-Math.PI / 8);
    skeletonMesh.scale.x = -1;
    skeletonMesh.zOffset = 0.005;

    return {
        skeletonMesh,
    };
};
