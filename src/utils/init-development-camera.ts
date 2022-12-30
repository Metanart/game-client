import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Camera } from 'classes/camera/camera';
import { renderer } from 'classes/renderer/utils';

export function initDevelopmentCamera(camera: Camera) {
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.minDistance = 10;
    orbitControls.maxDistance = 300;
    orbitControls.enableDamping = true;
}
