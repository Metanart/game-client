import Phaser from 'phaser';

import { Map, MapLayer, MapTileset } from 'engine/types';

import { SceneLayers } from 'scenes/enums';

import { Tilemaps } from 'tilemaps/utils/enums';
import { getTilemapData } from 'tilemaps/utils/get-tilemap-data';

import { Tilesets } from 'tilesets/utils/enums';
import { getTilesetData } from 'tilesets/utils/get-tileset-data';

export class Scene extends Phaser.Scene {
    public map!: Map;
    public mapTileset!: MapTileset;
    public mapLayers: Partial<Record<SceneLayers, MapLayer>> = {};

    loadTilemap(tilemap: Tilemaps) {
        this.load.tilemapTiledJSON(tilemap, getTilemapData(tilemap).jsonSrc);
    }

    loadTilemaps(tilemaps: Tilemaps[]) {
        tilemaps.map((tilemap) => {
            this.loadTilemap(tilemap);
        });
    }

    loadTileset(tileset: Tilesets) {
        this.load.image(tileset, getTilesetData(tileset).imageSrc);
    }

    loadTilesets(tilesets: Tilesets[]) {
        tilesets.map((tileset) => {
            this.loadTileset(tileset);
        });
    }

    createMap(tilemap: Tilemaps, tileset: Tilesets) {
        this.map = this.make.tilemap({ key: tilemap });
        this.mapTileset = this.map.addTilesetImage(tileset, tileset);
    }

    createMapLayer(layer: SceneLayers) {
        if (this.map && this.mapTileset) {
            this.mapLayers[layer] = this.map.createLayer(layer, this.mapTileset, 0, 0);
        } else {
            console.error('Map or MapTileset is not initialized');
        }
    }

    createMapLayers(layers: SceneLayers[]) {
        if (this.map && this.mapTileset) {
            layers.map((layer) => {
                this.createMapLayer(layer);
            });
        } else {
            console.error('Map or MapTileset is not initialized');
        }
    }
}
