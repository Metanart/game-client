import Phaser from 'phaser';

import { Scene } from 'engine/scene';

import { Spines } from 'spines/utils/enums';

import { Tilemaps } from 'tilemaps/utils/enums';

import { Tilesets } from 'tilesets/utils/enums';

import { SceneLayers, Scenes } from './enums';

let goblin: Phaser.GameObjects | undefined = undefined;
let cursors = undefined;
let camera = undefined;
let player = undefined;

export class MainScene extends Scene {
    constructor() {
        super({ key: Scenes.SCENE_MAIN });
    }

    preload() {
        this.loadSpine(Spines.SPINE_GOBLIN);
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

        this.mapLayers['SCENE_LAYER_WORLD']?.setCollisionByProperty({ collides: true });
        this.mapLayers['SCENE_LAYER_ABOVE_PLAYER']?.setDepth(10);

        const spawnPoint = this.map.findObject('Objects', (obj) => obj.name === 'SPAWN_POINT');

        goblin = this.add.spine(400, 600, Spines.SPINE_GOBLIN, 'idle', true);
        goblin.skeleton.setSkinByName('goblin');
        goblin.setScale(0.35);

        camera = this.cameras.main;
        camera.startFollow(goblin);
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        goblin.setPosition(spawnPoint.x, spawnPoint.y);

        this.physics.add.existing(goblin);

        goblin.body.setVelocity(100, 200);

        console.log('[IKATASONOV]:', goblin);
    }

    update(time, delta) {
        const speed = 175;
        const prevVelocity = goblin.body.velocity.clone();

        // Stop any previous movement from the last frame
        goblin.body.setVelocity(0);

        // Horizontal movement
        if (cursors.left.isDown) {
            goblin.body.setVelocityX(-speed);
        } else if (cursors.right.isDown) {
            goblin.body.setVelocityX(speed);
        }

        if (cursors.up.isDown) {
            goblin.body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            goblin.body.setVelocityY(speed);
        }

        goblin.body.velocity.normalize().scale(speed);

        if (cursors.left.isDown) {
            goblin.play('walk', true, true);
        } else if (cursors.right.isDown) {
            goblin.play('walk', true, true);
        } else if (cursors.up.isDown) {
            goblin.play('walk', true, true);
        } else if (cursors.down.isDown) {
            goblin.play('walk', true, true);
        } else {
            goblin.play('idle', true, true);
        }
    }
}
