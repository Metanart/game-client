import { Quaternion, Vector3 } from 'three';
import { calcNURBSDerivatives } from 'three/examples/jsm/curves/NURBSUtils';

import { playerConfig } from './config';
import { Player } from './player';

type TMovementKey = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD';

type TMovementKeysStatus = Record<TMovementKey, boolean>;

export class PlayerController {
    private movementKeysStatus: TMovementKeysStatus = {
        KeyW: false,
        KeyA: false,
        KeyS: false,
        KeyD: false,
    };

    private isRunning = false;

    private rotationAngle = new Vector3(0, 0, 0);
    private rotationQuaternion = new Quaternion();

    constructor(private playerPosition: Player['position']) {
        this.setup();
    }

    checkIfKeysAreActive() {
        const keys = this.movementKeysStatus;
        return keys['KeyW'] || keys['KeyA'] || keys['KeyS'] || keys['KeyD'];
    }

    setup() {
        this.setupKeyUpListener();
        this.setupKeyDownListener();
    }

    setupKeyDownListener() {
        window.addEventListener('keydown', (event) => {
            if (event.repeat) return;

            console.log('[IKATASONOV]:', event);

            this.isRunning = event.shiftKey;
            this.movementKeysStatus[event.code as TMovementKey] = true;
        });
    }

    setupKeyUpListener() {
        window.addEventListener('keyup', (event) => {
            console.log('[IKATASONOV]:', event);

            this.isRunning = event.shiftKey;
            this.movementKeysStatus[event.code as TMovementKey] = false;
        });
    }

    getDirectionOffset() {
        const keys = this.movementKeysStatus;
        const offset = new Vector3();
        const directValue = Math.PI / 2;
        const diagonalValue = Math.PI / 2 - Math.PI / 6;

        if (keys['KeyW'] && keys['KeyA']) {
            offset.x = diagonalValue;
            offset.z = -diagonalValue;
            return offset;
        }

        if (keys['KeyW'] && keys['KeyD']) {
            offset.x = diagonalValue;
            offset.z = diagonalValue;
            return offset;
        }

        if (keys['KeyS'] && keys['KeyA']) {
            offset.x = -diagonalValue;
            offset.z = -diagonalValue;
            return offset;
        }

        if (keys['KeyS'] && keys['KeyD']) {
            offset.x = -diagonalValue;
            offset.z = diagonalValue;
            return offset;
        }

        if (keys['KeyW']) {
            offset.x = directValue;
            return offset;
        }

        if (keys['KeyA']) {
            offset.z = -directValue;
            return offset;
        }

        if (keys['KeyS']) {
            offset.x = -directValue;
            return offset;
        }

        if (keys['KeyD']) {
            offset.z = directValue;
            return offset;
        }

        return offset;
    }

    updatePlayerPosition(delta: number) {
        if (!this.checkIfKeysAreActive()) return;

        const { walk, run } = playerConfig.speed;

        const keys = this.movementKeysStatus;

        const position = this.playerPosition;
        const velocity = this.isRunning ? run : walk;
        const offset = this.getDirectionOffset();

        const calculatedOffsetX = velocity * offset.x * delta;
        const calculatedOffsetZ = velocity * offset.z * delta;

        position.setX((position.x += calculatedOffsetX));
        position.setZ((position.z += calculatedOffsetZ));
    }

    tick(delta: number) {
        this.updatePlayerPosition(delta);
    }
}
