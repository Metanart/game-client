import Phaser from 'phaser';

import { GameConfig } from 'engine/types';

import { Scenes } from 'scenes/enums';
import { MainScene } from 'scenes/main-scene';

import 'phaser/types/SpinePlugin';
import 'phaser/plugins/spine/dist/SpineWebGLPlugin';

const gameConfig: GameConfig = {
    type: Phaser.AUTO,
    width: '100%',
    height: '100%',
    parent: 'game-root',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
        },
    },
    plugins: {
        scene: [
            {
                key: 'SpinePlugin',
                plugin: window.SpinePlugin,
                sceneKey: Scenes.SCENE_MAIN,
            },
        ],
    },
    scene: [MainScene],
};

window.addEventListener('load', () => {
    new Phaser.Game(gameConfig);
});
