import { Creature } from 'classes/creature/creature';

import { PlayerController } from './player-controller';

export class Player extends Creature {
    private controller = new PlayerController(this.position, this.rotation);

    constructor() {
        super();
    }

    tick(delta: number) {
        this.controller.tick(delta);
    }
}
