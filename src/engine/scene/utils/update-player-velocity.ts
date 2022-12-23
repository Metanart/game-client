import { T_Player, T_PlayerControls } from '../types';

const PLAYER_SPEED = 200;
const PLAYER_NEGATIVE_SPEED = -PLAYER_SPEED;
export const PLAYER_SCALE = 0.3;
const PLAYER_REVERTED_SCALE = -PLAYER_SCALE;

export function updatePlayerVelocity(player: T_Player, playerControls: T_PlayerControls) {
    if (playerControls.left.isDown) {
        player.body.setVelocityX(PLAYER_NEGATIVE_SPEED);
        player.setScale(PLAYER_REVERTED_SCALE, PLAYER_SCALE);
    } else if (playerControls.right.isDown) {
        player.body.setVelocityX(PLAYER_SPEED);
        player.setScale(PLAYER_SCALE);
    } else {
        player.body.setVelocityX(0);
    }

    if (playerControls.up.isDown) {
        player.body.setVelocityY(PLAYER_NEGATIVE_SPEED);
    } else if (playerControls.down.isDown) {
        player.body.setVelocityY(PLAYER_SPEED);
    } else {
        player.body.setVelocityY(0);
    }

    player.body.velocity.normalize().scale(PLAYER_SPEED);
}
