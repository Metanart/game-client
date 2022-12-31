import { Creature } from 'classes/creature/creature';

import { PlayerController } from './player-controller';

export class Player extends Creature {
    private controller = new PlayerController(this.position);

    constructor() {
        super();
    }

    tick() {
        this.controller.tick();
    }
}
