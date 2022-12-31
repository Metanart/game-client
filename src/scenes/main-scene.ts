import { Color } from 'three';

import { Light } from 'classes/light/light';
import { MapTile } from 'classes/map-tile/map-tile';
import { Player } from 'classes/player/player';
import { Scene } from 'classes/scene/scene';

import { Colors } from 'tokens/colors';

export class MainScene extends Scene {
    private player = new Player();
    private light = new Light();

    constructor() {
        super();
        this.background = new Color(Colors.LightGrey);
        this.add(this.light);
    }

    tick(delta: number) {
        this.player.tick(delta);
    }
}
