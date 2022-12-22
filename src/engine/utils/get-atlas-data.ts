import { ATLASES_PATH } from 'paths';

import { Atlases } from 'engine/enums/atlases';
import { AtlasData } from 'engine/types';

export const mapKeyToData: Record<Atlases, AtlasData> = {
    [Atlases.ATLAS_CHARACTER]: {
        imageSrc: 'character/character-atlas.png',
        jsonSrc: 'character/character-atlas.json',
    },
};

export const getAtlasData: (atlasKey: Atlases) => AtlasData = (atlasKey) => {
    return {
        imageSrc: `${ATLASES_PATH}/${mapKeyToData[atlasKey].imageSrc}`,
        jsonSrc: `${ATLASES_PATH}/${mapKeyToData[atlasKey].jsonSrc}`,
    };
};
