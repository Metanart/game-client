import Phaser from 'phaser';

import { E_Scene } from 'scenes/enums';

import { T_Camera, T_Player, T_PlayerControls, T_SceneMap } from './types';

export class Scene extends Phaser.Scene {
    public map!: T_SceneMap;
    public player!: T_Player;
    public playerCamera!: T_Camera;
    public playerControls!: T_PlayerControls;

    constructor(sceneKey: E_Scene) {
        super({ key: sceneKey });
    }
}
