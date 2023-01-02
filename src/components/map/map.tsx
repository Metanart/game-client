import { FC, Fragment } from 'react';

import { MapTile } from 'components/map-tile/map-tile';

export const Map: FC = () => {
    return (
        <Fragment>
            <MapTile position={[0, 0]} />
        </Fragment>
    );
};
