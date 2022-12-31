import { Clock } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import { Camera } from 'classes/camera/camera';
import { MapTile } from 'classes/map-tile/map-tile';
import { Player } from 'classes/player/player';
import { renderer } from 'classes/renderer/utils';
import { Workbench } from 'classes/workbench/workbench';

import { MainScene } from 'scenes/main-scene';

import { gridHelper } from 'utils/get-development-grid';
import { initDevelopmentCamera } from 'utils/init-development-camera';

import { World } from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';

const clock = new Clock();

export class Game {
    private world = new World();
    private camera = new Camera();
    private scene = new MainScene();
    // @ts-ignore
    private stats: Stats = new Stats();
    private cannonDebugger;

    constructor(parentElement: HTMLElement) {
        initDevelopmentCamera(this.camera);
        this.scene.add(gridHelper);
        this.setupStats();
        this.setupPhysics();

        // @ts-ignore
        this.cannonDebugger = new CannonDebugger(this.scene, this.world, {});

        parentElement.appendChild(renderer.domElement);

        this.tick();
    }

    render() {
        renderer.render(this.scene, this.camera);
    }

    setupPhysics() {
        this.world.gravity.set(0, -10, 0);

        const workbench = new Workbench();
        const player = new Player();
        const mapTile = new MapTile();

        workbench.position.setX(3);
        workbench.position.setZ(3);

        //this.scene.add(workbench);
        this.scene.add(mapTile);
        this.scene.add(player);

        this.world.addBody(player.getBody());
        this.world.addBody(mapTile.getBody());
        //this.world.addBody(workbench.getBody());
    }

    setupStats() {
        document.body.appendChild(this.stats.dom);
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));

        this.stats.update();

        this.scene.tick(clock.getDelta());
        this.cannonDebugger.update();
        this.render();
        this.world.fixedStep();
    }
}
