import { Scene } from 'engine/scene/scene';
import { createMap } from 'engine/scene/utils/create-map';
import { createPlayer } from 'engine/scene/utils/create-player';
import { createPlayerControls } from 'engine/scene/utils/create-player-controls';
import { getSpawnPoint } from 'engine/scene/utils/get-spawn-point';
import { preloadMap } from 'engine/scene/utils/preload-map';
import { preloadPlayer } from 'engine/scene/utils/preload-player';
import { updatePlayerAnimation } from 'engine/scene/utils/update-player-animation';
import { PLAYER_SCALE, updatePlayerVelocity } from 'engine/scene/utils/update-player-velocity';

import { E_Spines } from 'spines/utils/enums';

import { E_SpawnPoints, E_Tilemaps } from 'tilemaps/utils/enums';

import { E_Tilesets } from 'tilesets/utils/enums';

import { E_Scenes } from './enums';

import { T_SpawnPoint } from '../engine/scene/types';
import { createPlayerCamera } from '../engine/scene/utils/create-player-camera';
import { T_Dimensions } from '../utils/types';

export class MainScene extends Scene {
    constructor() {
        super(E_Scenes.SCENE_MAIN);
    }

    preload() {
        preloadPlayer(this, E_Spines.SPINE_GOBLIN);
        preloadMap(this, E_Tilemaps.TILEMAP_MAIN_LEVEL, E_Tilesets.TILESET_CITY);
    }

    create() {
        this.map = createMap(this, E_Tilemaps.TILEMAP_MAIN_LEVEL, E_Tilesets.TILESET_CITY);

        const playerSpawnPoint: T_SpawnPoint = getSpawnPoint(this.map.tilemap, E_SpawnPoints.SPAWN_POINT_PLAYER);
        const mapDimensions: T_Dimensions = {
            width: this.map.tilemap.widthInPixels,
            height: this.map.tilemap.heightInPixels,
        };

        this.player = createPlayer(this, E_Spines.SPINE_GOBLIN, playerSpawnPoint);
        this.playerCamera = createPlayerCamera(this, this.player, mapDimensions);
        this.playerControls = createPlayerControls(this);

        this.player.skeleton.setSkinByName('goblin');
        this.player.setScale(PLAYER_SCALE);
    }

    update() {
        updatePlayerVelocity(this.player, this.playerControls);
        updatePlayerAnimation(this.player, this.playerControls);
    }
}
