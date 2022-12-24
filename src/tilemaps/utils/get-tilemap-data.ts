import { E_Tilemap, E_TilemapLayer } from './enums';
import { T_TilemapData } from './types';

import { TILEMAPS_PATH } from 'utils/paths';

const mapKeyToData: Record<E_Tilemap, T_TilemapData> = {
    [E_Tilemap.TILEMAP_MAIN_LEVEL]: {
        jsonSrc: 'main-level-tilemap.json',
        layersKeys: [E_TilemapLayer.BELOW_PLAYER, E_TilemapLayer.WORLD, E_TilemapLayer.ABOVE_PLAYER],
    },
};

export const getTilemapData: (tilemapKey: E_Tilemap) => T_TilemapData = (tilemapKey) => {
    const { jsonSrc, layersKeys } = mapKeyToData[tilemapKey];
    return { jsonSrc: `${TILEMAPS_PATH}/${jsonSrc}`, layersKeys };
};
