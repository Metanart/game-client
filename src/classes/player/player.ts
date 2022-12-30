import { Creature } from 'classes/creature/creature';

import { initPlayerMovement } from './init-player-movement';

export class Player extends Creature {
    constructor() {
        super();
        initPlayerMovement(this);
    }
}
