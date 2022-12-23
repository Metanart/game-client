import { T_Player, T_PlayerControls } from '../types';

export function updatePlayerAnimation(player: T_Player, playerControls: T_PlayerControls) {
    if (playerControls.left.isDown) {
        player.play('walk', true, true);
    } else if (playerControls.right.isDown) {
        player.play('walk', true, true);
    } else if (playerControls.up.isDown) {
        player.play('walk', true, true);
    } else if (playerControls.down.isDown) {
        player.play('walk', true, true);
    } else {
        player.play('idle', true, true);
    }
}
