import { FC, Fragment } from 'react';

import { Map } from 'components/map/map';
import { Workbench } from 'components/workbench/workbench';

import { Spine } from '../spine/spine';

export const GameMap: FC = () => (
    <Fragment>
        <Map />
        <Spine />
        <Workbench />
    </Fragment>
);
