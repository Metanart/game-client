import { Clock } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import { Camera } from 'classes/camera/camera';
import { renderer } from 'classes/renderer/utils';

import { MainScene } from 'scenes/main-scene';

import { gridHelper } from 'utils/get-development-grid';
import { initDevelopmentCamera } from 'utils/init-development-camera';

import { Body, Plane, World } from 'cannon-es';
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

        // Floor
        const floorShape = new Plane();
        const floorBody = new Body({ mass: 0 });
        floorBody.addShape(floorShape);
        floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.world.addBody(floorBody);
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
