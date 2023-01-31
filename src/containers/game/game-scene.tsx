import { FC, Fragment } from 'react';

import { CN_Player } from 'containers/player/player';

import { MS_Map } from 'meshes/map/map';
import { MS_Tree } from 'meshes/tree/tree';
import { MS_Workbench } from 'meshes/workbench/workbench';

export const CN_GameScene: FC = () => (
    <Fragment>
        <MS_Map />
        <MS_Workbench />
        <MS_Tree />
        <CN_Player />
    </Fragment>
);
