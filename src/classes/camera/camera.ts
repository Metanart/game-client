import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

import { cameraSettings } from '../game/game-settings';

export class Camera extends ThreePerspectiveCamera {
    constructor() {
        const cameraSettings = {
            fov: 20,
            aspect: window.innerWidth / window.innerHeight,
            near: 1,
            far: 500,
        };

        const { fov, aspect, near, far } = cameraSettings;
        super(fov, aspect, near, far);
        this.position.set(100, 100, 0);
    }
}
