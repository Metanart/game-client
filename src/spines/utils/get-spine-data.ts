import { Spines } from './enums';
import { SpineData } from './types';

import { SPINES_PATH } from 'utils/paths';

const mapSpineToData: Record<Spines, SpineData> = {
    [Spines.SPINE_GOBLIN]: {
        atlasSrc: 'goblin/goblin.atlas',
        jsonSrc: 'goblin/goblin.json',
    },
};

export const getSpineData = (spine: Spines): SpineData => {
    const { atlasSrc, jsonSrc } = mapSpineToData[spine];

    return {
        atlasSrc: `${SPINES_PATH}/${atlasSrc}`,
        jsonSrc: `${SPINES_PATH}/${jsonSrc}`,
    };
};
