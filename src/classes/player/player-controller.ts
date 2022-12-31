import { Euler, Quaternion, Vector3 } from 'three';

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
    private direction: TDirection = 'Idle';
    private isRunning = false;

    constructor(private playerPosition: Vector3, private playerRotation: Euler) {
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

            this.isRunning = event.shiftKey;
            this.movementKeysStatus[event.code as TMovementKey] = true;
        });
    }

    setupKeyUpListener() {
        window.addEventListener('keyup', (event) => {
            this.isRunning = event.shiftKey;
            this.movementKeysStatus[event.code as TMovementKey] = false;
        });
    }

    getMovementOffset(): Vector3 {
        const offset = new Vector3();
        const directValue = Math.PI / 2;
        const diagonalValue = Math.PI / 2 - Math.PI / 6;

        switch (this.direction) {
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

    getMovementDirection(): TDirection {
        if (!this.checkIfKeysAreActive()) return 'Idle';

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

    updateDirection() {
        this.direction = this.getMovementDirection();
    }

    updateRotation() {
        const rotation = this.playerRotation;
        const halfAngle = Math.PI / 2;
        const quarterAngle = Math.PI / 4;

        switch (this.direction) {
            case 'UpLeft':
                rotation.set(0, quarterAngle, 0);
                break;
            case 'UpRight':
                rotation.set(0, -quarterAngle, 0);
                break;
            case 'DownLeft':
                rotation.set(0, -quarterAngle, 0);
                break;
            case 'DownRight':
                rotation.set(0, quarterAngle, 0);
                break;
            case 'Up':
                rotation.set(0, 0, 0);
                break;
            case 'Down':
                rotation.set(0, 0, 0);
                break;
            case 'Left':
                rotation.set(0, halfAngle, 0);
                break;
            case 'Right':
                rotation.set(0, -halfAngle, 0);
                break;
            case 'Idle':
                rotation.set(0, 0, 0);
                break;
        }
    }

    updatePosition(delta: number) {
        if (!this.checkIfKeysAreActive()) return;

        const { walk, run } = playerConfig.speed;

        const keys = this.movementKeysStatus;

        const position = this.playerPosition;
        const velocity = this.isRunning ? run : walk;
        const offset = this.getMovementOffset();

        const calculatedOffsetX = velocity * offset.x * delta;
        const calculatedOffsetZ = velocity * offset.z * delta;

        position.setX((position.x += calculatedOffsetX));
        position.setZ((position.z += calculatedOffsetZ));
    }

    tick(delta: number) {
        this.updateDirection();
        this.updateRotation();
        this.updatePosition(delta);
    }
}
