import { playerConfig } from './config';
import { Player } from './player';

type TMovementKey = 'w' | 'a' | 's' | 'd';

export class PlayerController {
    private movementKeysStatus: Record<TMovementKey, boolean> = {
        w: false,
        a: false,
        s: false,
        d: false,
    };

    private velocity = playerConfig.speed.walk;

    constructor(private playerPosition: Player['position']) {
        this.setup();
    }

    checkIfMovementKey(key: KeyboardEvent['key']) {
        return key === 'w' || key === 'a' || key === 's' || key === 'd';
    }

    setup() {
        this.setupKeyUpListener();
        this.setupKeyDownListener();
    }

    setupKeyDownListener() {
        window.addEventListener('keydown', (event) => {
            if (event.repeat) return;

            if (this.checkIfMovementKey(event.key)) {
                this.movementKeysStatus[event.key as TMovementKey] = true;
            }
        });
    }

    setupKeyUpListener() {
        window.addEventListener('keyup', (event) => {
            if (this.checkIfMovementKey(event.key)) {
                this.movementKeysStatus[event.key as TMovementKey] = false;
            }
        });
    }

    updatePositionFromVelocity() {
        const keys = this.movementKeysStatus;
        const position = this.playerPosition;
        const velocity = this.velocity;

        if (keys['w']) {
            position.setX((position.x -= velocity));
        }
        if (keys['a']) {
            position.setZ((position.z += velocity));
        }
        if (keys['s']) {
            position.setX((position.x += velocity));
        }
        if (keys['d']) {
            position.setZ((position.z -= velocity));
        }
    }

    tick() {
        this.updatePositionFromVelocity();
    }
}
