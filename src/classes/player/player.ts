import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import { code } from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';

import { Length } from 'global/measurements';

export class Player extends Mesh {
    constructor() {
        var xSpeed = 1;
        var zSpeed = 1;

        const boxWidth = Length.Decimeter * 4;
        const boxHeight = Length.Meter * 1.5;
        const boxDepth = Length.Decimeter * 4;
        const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue
        super(geometry, material);

        const onDocumentKeyDown = (event: KeyboardEvent) => {
            var keyCode = event.code;
            console.log('[IKATASONOV]:', keyCode);

            if (keyCode == 'KeyW') {
                this.position.x -= xSpeed;
            } else if (keyCode == 'KeyS') {
                this.position.x += xSpeed;
            }

            if (keyCode == 'KeyA') {
                this.position.z += zSpeed;
            } else if (keyCode == 'KeyD') {
                this.position.z -= zSpeed;
            }

            if (keyCode == 'Escape') {
                this.position.set(0, boxHeight / 2, 0);
            }
        };

        document.addEventListener('keydown', onDocumentKeyDown, false);

        this.position.setY(boxHeight / 2);
    }
}
