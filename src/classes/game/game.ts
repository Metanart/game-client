import { Color, GridHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Camera } from 'classes/camera/camera';
import { Player } from 'classes/player/player';
import { renderer } from 'classes/renderer/utils';

import { MainScene } from 'scenes/main-scene';

import { Light } from '../light/light';
import { MapTile } from '../map-tile/map-tile';

export class Game {
    private camera = new Camera();
    private scene = new MainScene();
    private player = new Player();
    private light = new Light();

    constructor() {
        const orbitControls = new OrbitControls(this.camera, renderer.domElement);
        orbitControls.minDistance = 10;
        orbitControls.maxDistance = 100;
        orbitControls.enableDamping = true;

        this.scene.background = new Color(0xeeeeee);

        const gridHelper = new GridHelper(20, 20);

        this.scene.add(gridHelper);

        this.scene.add(this.player);
        this.scene.add(this.light);
        this.scene.add();

        const mapTile = new MapTile();
        this.scene.add(mapTile);
    }

    render(time: number) {
        this.player.render(time);
        renderer.render(this.scene, this.camera);
        this.run();
    }

    renderToDom(element: HTMLElement) {
        element.appendChild(renderer.domElement);
        return this;
    }

    run() {
        requestAnimationFrame(this.render.bind(this));
        return this;
    }
}
