import { Euler } from 'three';

import { SkeletonMesh } from '@esotericsoftware/spine-threejs';
import { AxisRotator } from '@react-three/drei/web/pivotControls/AxisRotator';

import { ESpines } from 'classes/spine/enums';
import { SpineAssetsManager } from 'classes/spine/spine-assets-manager';

export const useSpineAsset = async (spineKey: ESpines) => {
    const assetManager = new SpineAssetsManager(ESpines.RAPTOR);
    await assetManager.load(spineKey);
    const skeletonMesh = assetManager.getSkeletonMesh() as SkeletonMesh;
    //skeletonMesh.rotateZ(Math.PI / 4);
    skeletonMesh.rotateX(-Math.PI / 8);
    //skeletonMesh.rotateY(Math.PI / 4);

    return {
        skeletonMesh,
    };
};
