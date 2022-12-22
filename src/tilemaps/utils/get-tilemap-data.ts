import { TILEMAPS_PATH } from 'paths';

import { Tilemaps } from './enums';
import { TilemapData } from './types';

const mapTilemapToData: Record<Tilemaps, TilemapData> = {
    [Tilemaps.TILEMAP_MAIN_LEVEL]: {
        jsonSrc: 'main-level-tilemap.json',
    },
};

export const getTilemapData: (tilemapKay: Tilemaps) => TilemapData = (tilemapKey) => {
    return { jsonSrc: `${TILEMAPS_PATH}/${mapTilemapToData[tilemapKey].jsonSrc}` };
};
