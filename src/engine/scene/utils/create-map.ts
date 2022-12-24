import { E_Tilemap, E_TilemapLayer } from 'tilemaps/utils/enums';
import { getTilemapData } from 'tilemaps/utils/get-tilemap-data';
import { getTilemapLayerData } from 'tilemaps/utils/get-tilemap-layer-data';

import { E_Tileset } from 'tilesets/utils/enums';

import { T_Scene, T_SceneMap, T_Tilemap, T_TilemapLayer, T_TilemapLayers, T_Tileset } from '../types';

function createTilemap(scene: T_Scene, tilemapKey: E_Tilemap): T_Tilemap {
    return scene.make.tilemap({ key: tilemapKey });
}

function setTilesetToTilemap(tilesetKey: E_Tileset, tilemap: T_Tilemap): T_Tileset {
    return tilemap.addTilesetImage(tilesetKey, tilesetKey);
}

function createTilemapLayer(tilemap: T_Tilemap, tilemapLayerKey: E_TilemapLayer, tileset: T_Tileset) {
    const layer = tilemap.createLayer(tilemapLayerKey, tileset, 0, 0);
    layer.setDepth(getTilemapLayerData(tilemapLayerKey).depth);
    return layer;
}

function createTilemapLayers(tilemap: T_Tilemap, tilemapKey: E_Tilemap, tileset: T_Tileset): T_TilemapLayers {
    const result: T_TilemapLayers = {};

    getTilemapData(tilemapKey).layersKeys.map((tilemapLayerKey) => {
        result[tilemapLayerKey] = createTilemapLayer(tilemap, tilemapLayerKey, tileset);
    });

    return result;
}

export const createMap = (scene: T_Scene, tilemapKey: E_Tilemap, tilesetKey: E_Tileset): T_SceneMap => {
    const tilemap: T_Tilemap = createTilemap(scene, tilemapKey);
    const tileset: T_Tileset = setTilesetToTilemap(tilesetKey, tilemap);
    const layers = createTilemapLayers(tilemap, tilemapKey, tileset);

    const getLayer = (layerKey: E_TilemapLayer): T_TilemapLayer => {
        return layers[layerKey]!;
    };

    return {
        tilemap,
        tileset,
        layers,
        getLayer,
    } as T_SceneMap;
};
