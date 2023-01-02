import { SkeletonMesh } from '@esotericsoftware/spine-threejs';

import { ESpines } from 'classes/spine/enums';
import { SpineAssetsManager } from 'classes/spine/spine-assets-manager';

export const useSpineAsset = async (spineKey: ESpines) => {
    const assetManager = new SpineAssetsManager(ESpines.RAPTOR);
    await assetManager.load(spineKey);
    const skeletonMesh = assetManager.getSkeletonMesh() as SkeletonMesh;

    skeletonMesh.rotateX(-Math.PI / 8);
    skeletonMesh.position.z = -1;
    skeletonMesh.scale.x = -1;

    return {
        skeletonMesh,
    };
};
