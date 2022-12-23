import { E_Spines } from 'spines/utils/enums';

import { T_GameObject, T_Player, T_Scene, T_SpineGameObject, T_SpineGameObjectWithBody } from '../types';
import { T_Position } from 'utils/types';

function addSpineToScene(scene: T_Scene, spineKey: E_Spines): T_SpineGameObject {
    return scene.add.spine(0, 0, spineKey, 'idle', true);
}

export function createPlayer(scene: T_Scene, spineKey: E_Spines, position?: T_Position): T_Player {
    const player: T_SpineGameObject = addSpineToScene(scene, spineKey);

    const playerWithBody = scene.physics.add.existing(player as unknown as T_GameObject) as unknown as T_Player;

    playerWithBody.setPosition(position?.x || 0, position?.y || 0);

    return playerWithBody;
}
