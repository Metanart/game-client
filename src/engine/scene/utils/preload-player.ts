import { E_Spine } from 'spines/utils/enums';
import { getSpineData } from 'spines/utils/get-spine-data';

import { T_Scene } from '../types';

function loadSpine(scene: T_Scene, spineKey: E_Spine) {
    const { atlasSrc, jsonSrc } = getSpineData(spineKey);
    scene.load.spine(spineKey, jsonSrc, atlasSrc);
}

export function preloadPlayer(scene: T_Scene, spineKey: E_Spine) {
    loadSpine(scene, spineKey);
}
