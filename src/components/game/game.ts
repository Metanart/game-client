import Phaser from 'phaser';

import { GameConfig } from 'engine/types';

import { MainScene } from 'scenes/main-scene';

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
    scene: [MainScene],
};

const game = new Phaser.Game(gameConfig);
