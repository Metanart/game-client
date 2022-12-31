import { Clock } from 'three';

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

    constructor(parentElement: HTMLElement) {
        if (IS_DEVELOPMENT_MODE) {
            initDevelopmentCamera(this.camera);
            this.scene.add(gridHelper);
        }

        parentElement.appendChild(renderer.domElement);

        this.tick();
    }

    render() {
        renderer.render(this.scene, this.camera);
    }

    tick() {
        requestAnimationFrame(this.tick.bind(this));

        this.render();
        this.scene.tick(clock.getDelta());
    }
}
