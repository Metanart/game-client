import { T_Player, T_Scene } from '../types';
import { T_Dimensions } from 'utils/types';

export function createPlayerCamera(scene: T_Scene, player: T_Player, mapDimensions: T_Dimensions) {
    const camera = scene.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, mapDimensions.width, mapDimensions.height);
    return camera;
}
