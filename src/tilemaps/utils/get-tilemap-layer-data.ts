import { E_TilemapLayer } from './enums';
import { T_TilemapLayerData } from './types';

import { TILEMAPS_PATH } from 'utils/paths';

const mapKeyToData: Record<E_TilemapLayer, T_TilemapLayerData> = {
    [E_TilemapLayer.BELOW_PLAYER]: {
        depth: 10,
    },
    [E_TilemapLayer.WORLD]: {
        depth: 20,
    },
    [E_TilemapLayer.PLAYER]: {
        depth: 25,
    },
    [E_TilemapLayer.ABOVE_PLAYER]: {
        depth: 30,
    },
};

export const getTilemapLayerData: (tilemapLayerKey: E_TilemapLayer) => T_TilemapLayerData = (tilemapLayerKey) => {
    return mapKeyToData[tilemapLayerKey];
};
