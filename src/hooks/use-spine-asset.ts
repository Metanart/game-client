import { SkeletonMesh } from '@esotericsoftware/spine-threejs';

import { ESpines } from 'classes/spine/enums';
import { SpineAssetsManager } from 'classes/spine/spine-assets-manager';

export const useSpineAsset = async (spineKey: ESpines) => {
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
