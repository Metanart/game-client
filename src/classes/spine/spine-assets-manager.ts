import {
    AssetManager,
    AtlasAttachmentLoader,
    SkeletonJson,
    SkeletonMesh,
    TextureAtlas,
} from '@esotericsoftware/spine-threejs';

import { SPINES_PATH } from 'constants/paths';

import { TAtlasPath, TJsonPath } from 'types';

import { ESpines } from './enums';

export class SpineAssetsManager extends AssetManager {
    textureAtlas: TextureAtlas | undefined;
    jsonPath: TJsonPath;
    atlasPath: TAtlasPath;

    constructor(private spineKey: ESpines) {
        super(SPINES_PATH);

        const { jsonPath, atlasPath } = this.getAssetPaths(spineKey);

        this.jsonPath = jsonPath;
        this.atlasPath = atlasPath;
    }

    getAssetPaths(spineKey: ESpines): { jsonPath: TJsonPath; atlasPath: TAtlasPath } {
        const path = `/${spineKey}/${spineKey}`;
        return {
            jsonPath: `${path}.json`,
            atlasPath: `${path}.atlas`,
        };
    }

    async load(spineKey: ESpines) {
        this.loadJson(this.jsonPath);
        this.loadTextureAtlas(this.atlasPath);

        await this.loadAll();

        this.textureAtlas = this.require(this.atlasPath);

        return this;
    }

    getSkeletonMesh(): SkeletonMesh | null {
        if (!this.textureAtlas) return null;

        const atlasLoader = new AtlasAttachmentLoader(this.textureAtlas);
        const skeletonJson = new SkeletonJson(atlasLoader);
        skeletonJson.scale = 0.002;

        const skeletonData = skeletonJson.readSkeletonData(this.require(this.jsonPath));

        return new SkeletonMesh(skeletonData, (parameters) => {
            parameters.depthTest = true;
            parameters.depthWrite = true;
            parameters.alphaTest = 0.001;
        });
    }
}
