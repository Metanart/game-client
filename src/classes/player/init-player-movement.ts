import { BoxGeometry } from 'three';

import { TKeyCode, TPosition } from 'types';

import { playerConfig } from './config';
import { Player } from './player';

function getDirectionOffset(keyCode: TKeyCode) {
    var directionOffset = 0; // w

    if (keyCode === 'KeyW') {
        if (keyCode === 'KeyA') {
            directionOffset = Math.PI / 4; // w+a
        } else if (keysPressed[D]) {
            directionOffset = -Math.PI / 4; // w+d
        }
    } else if (keysPressed[S]) {
        if (keysPressed[A]) {
            directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
        } else if (keysPressed[D]) {
            directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
        } else {
            directionOffset = Math.PI; // s
        }
    } else if (keysPressed[A]) {
        directionOffset = Math.PI / 2; // a
    } else if (keysPressed[D]) {
        directionOffset = -Math.PI / 2; // d
    }

    return directionOffset;
}

export function initPlayerMovement(player: Player, delta: number, keyCode: TKeyCode, direction: TCoordinates) {
    const onDocumentKeyDown = (event: KeyboardEvent) => {
        var keyCode = event.code;

        // calculate direction

        direction.y = 0;
        direction.normalize();
        direction.applyAxisAngle(this.rotateAngle, directionOffset);

        if (keyCode == 'KeyW') {
            player.position.x -= playerConfig.walk.velocity;
        } else if (keyCode == 'KeyS') {
            player.position.x += playerConfig.walk.velocity;
        }

        if (keyCode == 'KeyA') {
            player.position.z += playerConfig.walk.velocity;
        } else if (keyCode == 'KeyD') {
            player.position.z -= playerConfig.walk.velocity;
        }

        const geometry = player.geometry as BoxGeometry;

        if (keyCode == 'Escape') {
            player.position.set(0, geometry.parameters.height / 2, 0);
        }
    };

    document.addEventListener('keydown', onDocumentKeyDown, false);
}
