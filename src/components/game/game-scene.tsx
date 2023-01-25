import { FC, Fragment } from 'react';

import { CM_Player } from 'components/player/player';
import { C3D_Map } from 'components-3d/map/map';
import { C3D_Tree } from 'components-3d/tree/tree';
import { C3D_Workbench } from 'components-3d/workbench/workbench';

export const CM_GameScene: FC = () => (
    <Fragment>
        <C3D_Map />
        <C3D_Workbench />
        <C3D_Tree />
        <CM_Player />
    </Fragment>
);
