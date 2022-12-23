import Phaser from 'phaser';

import { T_Camera, T_Player, T_PlayerControls, T_SceneMap } from './types';

import { E_Scenes } from '../../scenes/enums';

export class Scene extends Phaser.Scene {
    public map!: T_SceneMap;
    public player!: T_Player;
    public playerCamera!: T_Camera;
    public playerControls!: T_PlayerControls;

    constructor(sceneKey: E_Scenes) {
        super({ key: sceneKey });
    }
}
