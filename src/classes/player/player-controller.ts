import { Quaternion, Vector3 } from 'three';

import { playerConfig } from './config';
import { Player } from './player';

type TMovementKey = 'KeyW' | 'KeyA' | 'KeyS' | 'KeyD';

type TDirection = 'Up' | 'Left' | 'Down' | 'Right' | 'UpLeft' | 'UpRight' | 'DownLeft' | 'DownRight' | 'Idle';

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

    getDirectionOffset(direction: TDirection): Vector3 {
        const offset = new Vector3();
        const directValue = Math.PI / 2;
        const diagonalValue = Math.PI / 2 - Math.PI / 6;

        switch (direction) {
            case 'UpLeft':
                offset.x = diagonalValue;
                offset.z = -diagonalValue;
                return offset;

            case 'UpRight':
                offset.x = diagonalValue;
                offset.z = diagonalValue;
                return offset;

            case 'DownLeft':
                offset.x = -diagonalValue;
                offset.z = -diagonalValue;
                return offset;

            case 'DownRight':
                offset.x = -diagonalValue;
                offset.z = diagonalValue;
                return offset;

            case 'Up':
                offset.x = directValue;
                return offset;

            case 'Down':
                offset.x = -directValue;
                return offset;

            case 'Left':
                offset.z = -directValue;
                return offset;

            case 'Right':
                offset.z = directValue;
                return offset;
        }

        return offset;
    }

    getDirection(): TDirection {
        const keys = this.movementKeysStatus;

        if (keys['KeyW'] && keys['KeyA']) return 'UpLeft';
        if (keys['KeyW'] && keys['KeyD']) return 'UpRight';
        if (keys['KeyS'] && keys['KeyA']) return 'DownLeft';
        if (keys['KeyS'] && keys['KeyD']) return 'DownRight';

        if (keys['KeyW']) return 'Up';
        if (keys['KeyA']) return 'Left';
        if (keys['KeyS']) return 'Down';
        if (keys['KeyD']) return 'Right';

        return 'Idle';
    }

    updatePlayerPosition(delta: number) {
        if (!this.checkIfKeysAreActive()) return;

        const { walk, run } = playerConfig.speed;

        const keys = this.movementKeysStatus;

        const position = this.playerPosition;
        const velocity = this.isRunning ? run : walk;
        const direction = this.getDirection();
        const offset = this.getDirectionOffset(direction);

        const calculatedOffsetX = velocity * offset.x * delta;
        const calculatedOffsetZ = velocity * offset.z * delta;

        position.setX((position.x += calculatedOffsetX));
        position.setZ((position.z += calculatedOffsetZ));
    }

    tick(delta: number) {
        this.updatePlayerPosition(delta);
    }
}
