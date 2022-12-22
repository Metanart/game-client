import Phaser, { Types as PhaserTypes } from 'phaser';

import { ImageSrc, JsonSrc } from 'types';

export type { Types as PhaserTypes } from 'phaser';

export type GameConfig = PhaserTypes.Core.GameConfig;

export type SceneConfig = PhaserTypes.Scenes.SettingsConfig;

export type ArcadePlayer = PhaserTypes.Physics.Arcade.SpriteWithDynamicBody;

export type KeyboardCursorKeys = PhaserTypes.Input.Keyboard.CursorKeys;

export type CameraControls = Phaser.Cameras.Controls.FixedKeyControl;

export type Map = Phaser.Tilemaps.Tilemap;
export type MapTileset = Phaser.Tilemaps.Tileset;
export type MapLayer = Phaser.Tilemaps.TilemapLayer;
