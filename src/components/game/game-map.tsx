import { FC, Fragment } from 'react';

import { Map } from 'components/map/map';
import { Player } from 'components/player/player';
import { Tree } from 'components/tree/tree';
import { Workbench } from 'components/workbench/workbench';

export const GameMap: FC = () => (
    <Fragment>
        <Map />
        <Player />
        <Workbench />
        <Tree />
    </Fragment>
);
