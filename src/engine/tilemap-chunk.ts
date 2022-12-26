import Phaser from 'phaser';

import { T_Scene, T_TilemapLayerData, T_TilemapTile } from './scene/types';
import { E_Tile } from './tile/enums';

import { T_Position } from '../utils/types';
import Noise from 'noisejs';

class TilemapChunk {
    public tiles: T_TilemapTile[] = [];
    public loadedTiles: T_TilemapTile[] = [];

    constructor(public scene: T_Scene, public layerData: T_TilemapLayerData, public position: T_Position) {
        if (!this.getIsGenerated()) this.generateTiles();
    }

    load() {
        if (!this.getIsLoaded()) {
            this.loadedTiles = this.tiles;
        }
    }

    unload() {
        if (this.getIsLoaded()) {
            this.loadedTiles = [];
        }
    }

    getIsLoaded() {
        return Boolean(this.loadedTiles.length);
    }

    getIsGenerated() {
        return Boolean(this.tiles.length);
    }

    getTileIndexByPerlinValue(value: number): number {
        if (value < 0.2) return E_Tile.GRASS;
        if (value >= 0.2 && value < 0.3) return E_Tile.GRASS;
        if (value >= 0.3) return E_Tile.GRASS;

        return 0;
    }

    generateTiles() {
        const { tileSize, chunkSize } = this.scene;

        for (let indexX = 0; indexX < chunkSize; indexX++) {
            for (let indexY = 0; indexY < chunkSize; indexY++) {
                const tilePositionX = this.position.x * (chunkSize * tileSize) + indexX * tileSize;
                const tilePositionY = this.position.y * (chunkSize * tileSize) + indexY * tileSize;

                const perlinValue = new Noise().perlin2(tilePositionX / 100, tilePositionY / 100);

                const tile = new Phaser.Tilemaps.Tile(
                    this.layerData,
                    this.getTileIndexByPerlinValue(perlinValue),
                    tilePositionX,
                    tilePositionY,
                    tileSize,
                    tileSize,
                    tileSize,
                    tileSize,
                );

                this.tiles.push(tile);
            }
        }
    }
}
