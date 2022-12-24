import { E_TilemapLayer } from './enums';

import { T_JsonSrc } from 'utils/types';

export type T_TilemapData = {
    jsonSrc: T_JsonSrc;
    layersKeys: E_TilemapLayer[];
};

export type T_TilemapLayerData = {
    depth: number;
};
