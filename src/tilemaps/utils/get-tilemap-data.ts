import { E_TilemapLayers, E_Tilemaps } from './enums';
import { T_TilemapData } from './types';

import { TILEMAPS_PATH } from 'utils/paths';

const mapTilemapToData: Record<E_Tilemaps, T_TilemapData> = {
    [E_Tilemaps.TILEMAP_MAIN_LEVEL]: {
        jsonSrc: 'main-level-tilemap.json',
        layersKeys: [
            E_TilemapLayers.TILEMAP_LAYER_BELOW_PLAYER,
            E_TilemapLayers.TILEMAP_LAYER_WORLD,
            E_TilemapLayers.TILEMAP_LAYER_ABOVE_PLAYER,
        ],
    },
};

export const getTilemapData: (tilemap: E_Tilemaps) => T_TilemapData = (tilemap) => {
    const { jsonSrc, layersKeys } = mapTilemapToData[tilemap];
    return { jsonSrc: `${TILEMAPS_PATH}/${jsonSrc}`, layersKeys };
};
