import { E_Tilemaps } from 'tilemaps/utils/enums';
import { getTilemapData } from 'tilemaps/utils/get-tilemap-data';

import { E_Tilesets } from 'tilesets/utils/enums';
import { getTilesetData } from 'tilesets/utils/get-tileset-data';

import { T_Scene } from '../types';

function loadTilemap(scene: T_Scene, tilemapKey: E_Tilemaps) {
    return scene.load.tilemapTiledJSON(tilemapKey, getTilemapData(tilemapKey).jsonSrc);
}

function loadTileset(scene: T_Scene, tilesetKey: E_Tilesets) {
    scene.load.image(tilesetKey, getTilesetData(tilesetKey).imageSrc);
}

export function preloadMap(scene: T_Scene, tilemapKey: E_Tilemaps, tilesetKey: E_Tilesets): void {
    loadTilemap(scene, tilemapKey);
    loadTileset(scene, tilesetKey);
}
