import Phaser from 'phaser';

import { E_TilemapLayers } from 'tilemaps/utils/enums';

import 'phaser/types/SpineGameObject.d.ts';

export type T_Scene = Phaser.Scene;

export type T_SceneMap = {
    tilemap: T_Tilemap;
    tileset: T_Tileset;
    layers: T_TilemapLayers;
};

export type T_Tileset = Phaser.Tilemaps.Tileset;

export type T_Tilemap = Phaser.Tilemaps.Tilemap;

export type T_TilemapLayer = Phaser.Tilemaps.TilemapLayer;

export type T_TilemapLayers = Partial<Record<E_TilemapLayers, T_TilemapLayer>>;

// eslint-disable-next-line no-undef
export type T_SpineGameObject = SpineGameObject;
export type T_SpineGameObjectWithBody = T_SpineGameObject & {
    body: Phaser.Physics.Arcade.Body;
};
export type T_Player = T_SpineGameObjectWithBody;

export type T_CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys;
export type T_PlayerControls = T_CursorKeys;

export type T_GameObject = Phaser.GameObjects.GameObject;
export type T_GameObjectWithBody = Phaser.Types.Physics.Arcade.GameObjectWithBody;

export type T_SpawnPoint = Phaser.Types.Tilemaps.TiledObject & { x: number; y: number };

export type T_Camera = Phaser.Cameras.Scene2D.Camera;
