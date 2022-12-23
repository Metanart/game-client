import { E_Spines } from './enums';
import { T_SpineData } from './types';

import { SPINES_PATH } from 'utils/paths';

const mapSpineToData: Record<E_Spines, T_SpineData> = {
    [E_Spines.SPINE_GOBLIN]: {
        atlasSrc: 'goblin/goblin.atlas',
        jsonSrc: 'goblin/goblin.json',
    },
};

export const getSpineData = (spineKey: E_Spines): T_SpineData => {
    const { atlasSrc, jsonSrc } = mapSpineToData[spineKey];

    return {
        atlasSrc: `${SPINES_PATH}/${atlasSrc}`,
        jsonSrc: `${SPINES_PATH}/${jsonSrc}`,
    };
};
