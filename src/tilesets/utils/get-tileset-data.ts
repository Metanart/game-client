import { E_Tileset } from './enums';
import { T_TilesetData } from './types';

import { TILESETS_PATH } from 'utils/paths';

const mapTilesetToData: Record<E_Tileset, T_TilesetData> = {
    [E_Tileset.TILESET_CITY]: {
        imageSrc: 'city-tileset.png',
    },
};

export const getTilesetData: (tilesetKey: E_Tileset) => T_TilesetData = (tilesetKey) => {
    return { imageSrc: `${TILESETS_PATH}/${mapTilesetToData[tilesetKey].imageSrc}` };
};
