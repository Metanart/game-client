import { E_Tilesets } from './enums';
import { T_TilesetData } from './types';

import { TILESETS_PATH } from 'utils/paths';

const mapTilesetToData: Record<E_Tilesets, T_TilesetData> = {
    [E_Tilesets.TILESET_CITY]: {
        imageSrc: 'city-tileset.png',
    },
};

export const getTilesetData: (tilesetKey: E_Tilesets) => T_TilesetData = (tilesetKey) => {
    return { imageSrc: `${TILESETS_PATH}/${mapTilesetToData[tilesetKey].imageSrc}` };
};
