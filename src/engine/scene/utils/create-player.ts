import { E_Spine } from 'spines/utils/enums';

import { E_TilemapLayer } from 'tilemaps/utils/enums';
import { getTilemapLayerData } from 'tilemaps/utils/get-tilemap-layer-data';

import { T_GameObject, T_Player, T_Scene, T_SpineGameObject, T_TilemapLayer } from '../types';
import { T_Position } from 'utils/types';

function addSpineToScene(scene: T_Scene, spineKey: E_Spine): T_SpineGameObject {
    return scene.add.spine(0, 0, spineKey, 'idle', true);
}

export function createPlayer(
    scene: T_Scene,
    spineKey: E_Spine,
    colliderLayer: T_TilemapLayer,
    position?: T_Position,
): T_Player {
    const playerDepth = getTilemapLayerData(E_TilemapLayer.PLAYER).depth;
    const player: T_SpineGameObject = addSpineToScene(scene, spineKey).setDepth(playerDepth);
    const playerWithBody = scene.physics.add.existing(player as unknown as T_GameObject) as unknown as T_Player;

    scene.physics.add.collider(playerWithBody as unknown as T_GameObject, colliderLayer);
    playerWithBody.setPosition(position?.x || 0, position?.y || 0);

    return playerWithBody;
}
