import Phaser from 'phaser';

import { Scene } from 'engine/scene/scene';
import { GameConfig } from 'engine/types';

const gameConfig: GameConfig = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    parent: 'game-root',
    backgroundColor: '#000',
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    scene: [Scene],
};

const Game = new Phaser.Game(gameConfig);
