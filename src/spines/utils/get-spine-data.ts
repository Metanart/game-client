import { SPINES_PATH } from 'paths';

import { Spines } from './enums';
import { SpineData } from './types';

const mapSpineToData: Record<Spines, SpineData> = {
    [Spines.SPINE_GOBLINS]: {
        atlasSrc: 'goblins/goblins.atlas',
        jsonSrc: 'goblins/goblins.json',
    },
};

export const getSpineData = (spine: Spines): SpineData => {
    const { atlasSrc, jsonSrc } = mapSpineToData[spine];

    return {
        atlasSrc: `${SPINES_PATH}/${atlasSrc}`,
        jsonSrc: `${SPINES_PATH}/${jsonSrc}`,
    };
};
