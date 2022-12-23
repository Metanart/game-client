import { E_Tilemaps } from 'tilemaps/utils/enums';
import { getTilemapData } from 'tilemaps/utils/get-tilemap-data';

import { E_Tilesets } from 'tilesets/utils/enums';

import { T_Scene, T_SceneMap, T_Tilemap, T_TilemapLayers, T_Tileset } from '../types';

function createTilemap(scene: T_Scene, tilemapKey: E_Tilemaps): T_Tilemap {
    return scene.make.tilemap({ key: tilemapKey });
}

function setTilesetToTilemap(tilesetKey: E_Tilesets, tilemap: T_Tilemap): T_Tileset {
    return tilemap.addTilesetImage(tilesetKey, tilesetKey);
}

function createTilemapLayers(tilemap: T_Tilemap, tilemapKey: E_Tilemaps, tileset: T_Tileset): T_TilemapLayers {
    const result: T_TilemapLayers = {};

    getTilemapData(tilemapKey).layersKeys.map((layerKey) => {
        result[layerKey] = tilemap.createLayer(layerKey, tileset, 0, 0);
    });

    return result;
}

export const createMap = (scene: T_Scene, tilemapKey: E_Tilemaps, tilesetKey: E_Tilesets): T_SceneMap => {
    const tilemap: T_Tilemap = createTilemap(scene, tilemapKey);
    const tileset: T_Tileset = setTilesetToTilemap(tilesetKey, tilemap);
    const layers = createTilemapLayers(tilemap, tilemapKey, tileset);

    return {
        tilemap,
        tileset,
        layers,
    };
};
