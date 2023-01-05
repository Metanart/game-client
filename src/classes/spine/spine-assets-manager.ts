import {
    AssetManager,
    AtlasAttachmentLoader,
    SkeletonJson,
    SkeletonMesh,
    TextureAtlas,
} from '@esotericsoftware/spine-threejs';

import { SPINES_PATH } from 'constants/paths';

import { TAtlasSrc, TJsonSrc } from 'types';

import { ESpines } from './enums';

export class SpineAssetsManager extends AssetManager {
    textureAtlas: TextureAtlas | undefined;
    jsonSrc: TJsonSrc;
    atlasSrc: TAtlasSrc;

    constructor(private spineKey: ESpines) {
        super(SPINES_PATH);

        const { jsonSrc, atlasSrc } = this.getAssetSrc(spineKey);

        this.jsonSrc = jsonSrc;
        this.atlasSrc = atlasSrc;
    }

    getAssetSrc(spineKey: ESpines): { jsonSrc: TJsonSrc; atlasSrc: TAtlasSrc } {
        const path = `/${spineKey}/${spineKey}`;
        return {
            jsonSrc: `${path}.json`,
            atlasSrc: `${path}.atlas`,
        };
    }

    async load(spineKey: ESpines) {
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

        const skeletonData = skeletonJson.readSkeletonData(this.require(this.jsonSrc));

        return new SkeletonMesh(skeletonData, (parameters) => {
            parameters.depthTest = true;
            parameters.depthWrite = true;
            parameters.alphaTest = 0.001;
        });
    }
}
