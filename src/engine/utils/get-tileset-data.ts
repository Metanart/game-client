import { TILESETS_PATH } from 'paths';

import { Tilesets } from 'engine/enums/tilesets';
import { TilesetData } from 'engine/types';

export const mapKeyToData: Record<Tilesets, TilesetData> = {
    [Tilesets.TILESET_CITY]: {
        imageSrc: 'city-tileset.png',
    },
};

export const getTilesetData = (tilesetKey: Tilesets) => {
    const { imageSrc } = mapKeyToData[tilesetKey];
    return { imageSrc: `${TILESETS_PATH}/${imageSrc}` };
};
