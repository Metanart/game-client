import { Scene } from 'engine/scene/scene';
import { T_SpawnPoint } from 'engine/scene/types';
import { createMap } from 'engine/scene/utils/create-map';
import { createPlayer } from 'engine/scene/utils/create-player';
import { createPlayerCamera } from 'engine/scene/utils/create-player-camera';
import { createPlayerControls } from 'engine/scene/utils/create-player-controls';
import { getSpawnPoint } from 'engine/scene/utils/get-spawn-point';
import { preloadMap } from 'engine/scene/utils/preload-map';
import { preloadPlayer } from 'engine/scene/utils/preload-player';
import { updatePlayerAnimation } from 'engine/scene/utils/update-player-animation';
import { updatePlayerVelocity } from 'engine/scene/utils/update-player-velocity';

import { E_Spine } from 'spines/utils/enums';

import { E_SpawnPoint, E_Tilemap, E_TilemapLayer } from 'tilemaps/utils/enums';

import { E_Tileset } from 'tilesets/utils/enums';

import { E_Scene } from './enums';

import { createCollisionsDebug } from '../engine/scene/utils/create-collisions-debug';
import { T_Dimensions } from 'utils/types';

export class MainScene extends Scene {
    constructor() {
        super(E_Scene.MAIN);
    }

    preload() {
        preloadPlayer(this, E_Spine.GOBLIN);
        preloadMap(this, E_Tilemap.TILEMAP_MAIN_LEVEL, E_Tileset.TILESET_CITY);
    }

    create() {
        this.map = createMap(this, E_Tilemap.TILEMAP_MAIN_LEVEL, E_Tileset.TILESET_CITY);

        const playerSpawnPoint: T_SpawnPoint = getSpawnPoint(this.map.tilemap, E_SpawnPoint.SPAWN_POINT_PLAYER);
        const mapDimensions: T_Dimensions = {
            width: this.map.tilemap.widthInPixels,
            height: this.map.tilemap.heightInPixels,
        };

        const worldLayer = this.map.getLayer(E_TilemapLayer.WORLD);
        worldLayer.setCollisionByProperty({ collides: true });

        this.player = createPlayer(this, E_Spine.GOBLIN, worldLayer, playerSpawnPoint);
        this.playerCamera = createPlayerCamera(this, this.player, mapDimensions);
        this.playerControls = createPlayerControls(this);

        this.player.skeleton.setSkinByName('goblin');
        this.player.setScale(0.2);

        createCollisionsDebug(this, worldLayer);
    }

    update() {
        updatePlayerVelocity(this.player, this.playerControls);
        updatePlayerAnimation(this.player, this.playerControls);
    }
}
