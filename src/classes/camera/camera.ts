import { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

import { gameConfig } from 'classes/game/config';

export class Camera extends ThreePerspectiveCamera {
    constructor() {
        const { fov, aspect, near, far } = gameConfig.camera;

        super(fov, aspect, near, far);

        this.position.set(100, 100, 0);
    }
}
