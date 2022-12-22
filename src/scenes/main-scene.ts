import Phaser from 'phaser';

import { Scene } from 'engine/scene';

import { Spines } from 'spines/utils/enums';

import { Tilemaps } from 'tilemaps/utils/enums';

import { Tilesets } from 'tilesets/utils/enums';

import { SceneLayers, Scenes } from './enums';

export class MainScene extends Scene {
    constructor() {
        super({ key: Scenes.SCENE_MAIN });
    }

    preload() {
        this.loadSpine(Spines.SPINE_GOBLINS);
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

        const goblin = this.add.spine(400, 600, Spines.SPINE_GOBLINS, 'idle', true);
        goblin.skeleton.setSkinByName('goblin');
    }
}
