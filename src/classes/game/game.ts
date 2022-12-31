import { Clock } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';

import { Camera } from 'classes/camera/camera';
import { renderer } from 'classes/renderer/utils';

import { MainScene } from 'scenes/main-scene';

import { IS_DEVELOPMENT_MODE } from 'constants/mode';

import { gridHelper } from 'utils/get-development-grid';
import { initDevelopmentCamera } from 'utils/init-development-camera';
const clock = new Clock();

export class Game {
    private camera = new Camera();
    private scene = new MainScene();
    // @ts-ignore
    private stats: Stats = new Stats();

    constructor(parentElement: HTMLElement) {
        if (IS_DEVELOPMENT_MODE) {
            initDevelopmentCamera(this.camera);
            this.scene.add(gridHelper);
        }

        parentElement.appendChild(renderer.domElement);

        this.setupStats();
        this.tick();
    }

    render() {
        renderer.render(this.scene, this.camera);
    }

    setupStats() {
        document.body.appendChild(this.stats.dom);
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));
        this.stats.update();
        this.render();
        this.scene.tick(clock.getDelta());
    }
}
