import Phaser from 'phaser';

import { T_Scene, T_TilemapLayer } from '../types';

export function createCollisionsDebug(scene: T_Scene, collisionsLayer: T_TilemapLayer) {
    scene.physics.world.createDebugGraphic();

    const graphics = scene.add
        .graphics()
        .setAlpha(0.75)
        .setDepth(collisionsLayer.depth + 1);

    collisionsLayer.renderDebug(graphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
    });
}
