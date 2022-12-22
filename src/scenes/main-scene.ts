import { Layers } from 'engine/enums/layers';
import { Tilemaps } from 'engine/enums/tilemaps';
import { Tilesets } from 'engine/enums/tilesets';
import { Scene } from 'engine/scene/scene';

export class MainScene extends Scene {
    preload() {
        this.loadTileset(Tilesets.TILESET_CITY);
        this.loadTilemap(Tilemaps.TILEMAP_MAIN_LEVEL);
    }

    create() {
        this.createMap(Tilemaps.TILEMAP_MAIN_LEVEL, Tilesets.TILESET_CITY);
        this.createMapLayers([Layers.LAYER_BELOW_PLAYER, Layers.LAYER_WORLD, Layers.LAYER_ABOVE_PLAYER]);
    }
}
