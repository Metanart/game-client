import Phaser from 'phaser';

import { T_GameConfig } from 'engine/types';

import { E_Scenes } from 'scenes/enums';
import { MainScene } from 'scenes/main-scene';

import 'phaser/types/SpinePlugin';
import 'phaser/plugins/spine/dist/SpineWebGLPlugin';

const gameConfig: T_GameConfig = {
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
                sceneKey: E_Scenes.SCENE_MAIN,
            },
        ],
    },
    scene: [MainScene],
};

window.addEventListener('load', () => {
    new Phaser.Game(gameConfig);
});
