import { E_SpawnPoints } from 'tilemaps/utils/enums';

import { T_SpawnPoint, T_Tilemap } from '../types';

export function getSpawnPoint(tilemap: T_Tilemap, spawnPointKey: E_SpawnPoints): T_SpawnPoint {
    const point = tilemap.findObject('Objects', (obj) => obj.name === spawnPointKey);

    if (!point.x) point.x = 0;
    if (!point.y) point.y = 0;

    return point as T_SpawnPoint;
}
