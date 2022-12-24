import { E_Spine } from './enums';
import { T_SpineData } from './types';

import { SPINES_PATH } from 'utils/paths';

const mapSpineToData: Record<E_Spine, T_SpineData> = {
    [E_Spine.GOBLIN]: {
        atlasSrc: 'goblin/goblin.atlas',
        jsonSrc: 'goblin/goblin.json',
    },
};

export const getSpineData = (spineKey: E_Spine): T_SpineData => {
    const { atlasSrc, jsonSrc } = mapSpineToData[spineKey];

    return {
        atlasSrc: `${SPINES_PATH}/${atlasSrc}`,
        jsonSrc: `${SPINES_PATH}/${jsonSrc}`,
    };
};
