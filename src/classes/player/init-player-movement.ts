import { playerConfig } from './config';
import { Player } from './player';

import hotkeys from 'hotkeys-js';

type SettingsMovementKeys = 'w' | 's' | 'a' | 'd' | 'w+a' | 'w+d' | 's+a' | 's+d' | 'a+w' | 'd+w' | 'a+s' | 'd+s';

const movementKeys: SettingsMovementKeys[] = [
    'w',
    's',
    'a',
    'd',
    'w+a',
    'w+d',
    's+a',
    's+d',
    'a+w',
    'd+w',
    'a+s',
    'd+s',
];

const { velocity } = playerConfig.walk;

export function initPlayerMovement(player: Player) {
    hotkeys(movementKeys.join(','), function (event, handler) {
        switch (handler.key as SettingsMovementKeys) {
            case 'w':
                player.position.setX(player.position.x + velocity * -1);
                break;
            case 's':
                player.position.setX(player.position.x + velocity);
                break;
            case 'a':
                player.position.setZ(player.position.z + velocity);
                break;
            case 'd':
                player.position.setZ(player.position.z + velocity * -1);
                break;
            case 'w+a':
            case 'a+w':
                player.position.setX(player.position.x + velocity * -1);
                player.position.setZ(player.position.z + velocity);
                break;
            case 'w+d':
            case 'd+w':
                player.position.setX(player.position.x + velocity * -1);
                player.position.setZ(player.position.z + velocity * -1);
                break;
            case 's+a':
            case 'a+s':
                player.position.setX(player.position.x + velocity);
                player.position.setZ(player.position.z + velocity);
                break;
            case 's+d':
            case 'd+s':
                player.position.setX(player.position.x + velocity);
                player.position.setZ(player.position.z + velocity * -1);
                break;
            default:
                alert(event);
        }
    });
}
