import { Tilesets } from './enums';
import { TilesetData } from './types';

import { TILESETS_PATH } from 'utils/paths';

const mapTilesetToData: Record<Tilesets, TilesetData> = {
    [Tilesets.TILESET_CITY]: {
        imageSrc: 'city-tileset.png',
    },
};

export const getTilesetData: (tileset: Tilesets) => TilesetData = (tileset) => {
    return { imageSrc: `${TILESETS_PATH}/${mapTilesetToData[tileset].imageSrc}` };
};
