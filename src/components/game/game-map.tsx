import { FC, Fragment } from 'react';

import { Map } from 'components/map/map';
import { Player } from 'components/player/player';
import { Workbench } from 'components/workbench/workbench';

export const GameMap: FC = () => (
    <Fragment>
        <Map />
        <Player />
        <Workbench />
    </Fragment>
);
