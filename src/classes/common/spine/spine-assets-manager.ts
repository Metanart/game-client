import {
    AssetManager,
    AtlasAttachmentLoader,
    SkeletonJson,
    SkeletonMesh,
    TextureAtlas,
} from '@esotericsoftware/spine-threejs';

import { SPINES_PATH } from 'constants/paths';

import { T_AtlasSrc, T_JsonSrc } from 'types/generic';

import { E_Spines } from './enums';

export class CL_SpineAssetsManager extends AssetManager {
    textureAtlas: TextureAtlas | undefined;
    jsonSrc: T_JsonSrc;
    atlasSrc: T_AtlasSrc;

    constructor(private spineId: E_Spines) {
        super(SPINES_PATH);

        const { jsonSrc, atlasSrc } = this.getAssetSrc(spineId);

        this.jsonSrc = jsonSrc;
        this.atlasSrc = atlasSrc;
    }

    getAssetSrc(spineId: E_Spines): {
        jsonSrc: T_JsonSrc;
        atlasSrc: T_AtlasSrc;
    } {
        const path = `/${spineId}/${spineId}`;
        return {
            jsonSrc: `${path}.json`,
            atlasSrc: `${path}.atlas`,
        };
    }

    async load() {
        this.loadJson(this.jsonSrc);
        this.loadTextureAtlas(this.atlasSrc);

        await this.loadAll();

        this.textureAtlas = this.require(this.atlasSrc);

        return this;
    }

    getSkeletonMesh(): SkeletonMesh | null {
        if (!this.textureAtlas) return null;

        const atlasLoader = new AtlasAttachmentLoader(this.textureAtlas);
        const skeletonJson = new SkeletonJson(atlasLoader);
        skeletonJson.scale = 0.002;

        const skeletonData = skeletonJson.readSkeletonData(
            this.require(this.jsonSrc),
        );

        return new SkeletonMesh(skeletonData, (parameters) => {
            parameters.depthTest = true;
            parameters.depthWrite = true;
            parameters.alphaTest = 0.001;
        });
    }
}
