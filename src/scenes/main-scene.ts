import { Scene } from 'engine/scene';

import { Tilemaps } from 'tilemaps/utils/enums';

import { Tilesets } from 'tilesets/utils/enums';

import { SceneLayers } from './enums';

export class MainScene extends Scene {
    preload() {
        this.loadTileset(Tilesets.TILESET_CITY);
        this.loadTilemap(Tilemaps.TILEMAP_MAIN_LEVEL);
    }

    create() {
        this.createMap(Tilemaps.TILEMAP_MAIN_LEVEL, Tilesets.TILESET_CITY);
        this.createMapLayers([
            SceneLayers.SCENE_LAYER_BELOW_PLAYER,
            SceneLayers.SCENE_LAYER_WORLD,
            SceneLayers.SCENE_LAYER_ABOVE_PLAYER,
        ]);
    }
}
