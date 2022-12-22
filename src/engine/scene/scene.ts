import Phaser from 'phaser';

import { Atlases } from 'engine/enums/atlases';
import { Layers } from 'engine/enums/layers';
import { Tilemaps } from 'engine/enums/tilemaps';
import { Tilesets } from 'engine/enums/tilesets';
import { Map, MapLayer, MapTileset } from 'engine/types';
import { getAtlasData } from 'engine/utils/get-atlas-data';
import { getTilemapData } from 'engine/utils/get-tilemap-data';
import { getTilesetData } from 'engine/utils/get-tileset-data';

export class Scene extends Phaser.Scene {
    public map!: Map;
    public mapTileset!: MapTileset;
    public mapLayers: Partial<Record<Layers, MapLayer>> = {};

    loadAtlas(atlas: Atlases) {
        const { imageSrc, jsonSrc } = getAtlasData(atlas);
        this.load.atlas(atlas, imageSrc, jsonSrc);
    }

    loadAtlases(atlases: Atlases | Atlases[]) {
        if (typeof atlases === 'object') {
            atlases.map((atlas) => {
                this.loadAtlas(atlas);
            });
        }
    }

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

    createMapLayer(layer: Layers) {
        if (this.map && this.mapTileset) {
            this.mapLayers[layer] = this.map.createLayer(layer, this.mapTileset, 0, 0);
        } else {
            console.error('Map or MapTileset is not initialized');
        }
    }

    createMapLayers(layers: Layers[]) {
        if (this.map && this.mapTileset) {
            layers.map((layer) => {
                this.createMapLayer(layer);
            });
        } else {
            console.error('Map or MapTileset is not initialized');
        }
    }
}
