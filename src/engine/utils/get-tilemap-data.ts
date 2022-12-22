import { TILEMAPS_PATH } from 'paths';

import { JsonSrc } from 'types';

import { Tilemaps } from 'engine/enums/tilemaps';
import { TilemapData } from 'engine/types';

type TilesetData = {
    jsonSrc: JsonSrc;
};

export const mapKeyToData: Record<Tilemaps, TilesetData> = {
    [Tilemaps.TILEMAP_MAIN_LEVEL]: {
        jsonSrc: 'main-level-tilemap.json',
    },
};

export const getTilemapData: (tilemapKay: Tilemaps) => TilemapData = (tilemapKey) => {
    return { jsonSrc: `${TILEMAPS_PATH}/${mapKeyToData[tilemapKey].jsonSrc}` };
};
