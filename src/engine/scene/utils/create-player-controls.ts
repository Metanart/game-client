import { T_Scene } from '../types';

export function createPlayerControls(scene: T_Scene) {
    return scene.input.keyboard.createCursorKeys();
}
