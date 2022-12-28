import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

import { cameraSettings } from '../game/game-settings';

export class Camera extends ThreePerspectiveCamera {
    constructor() {
        const cameraSettings = {
            fov: 90,
            aspect: window.innerWidth / window.innerHeight,
            near: 1,
            far: 1000,
        };

        const { fov, aspect, near, far } = cameraSettings;
        super(fov, aspect, near, far);
        this.position.set(0, 200, 300);
    }
}
