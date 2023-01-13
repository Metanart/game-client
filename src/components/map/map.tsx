import { FC, Fragment } from 'react';

import { usePlane } from '@react-three/cannon';
import { Plane } from '@react-three/drei';

import { MapTile } from 'components/map-tile/map-tile';

import { Colors } from 'tokens/colors';

export const Map: FC = () => {
    const [planeRef, planeApi] = usePlane(() => ({
        args: [100, 100],
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0],
    }));

    return (
        <Fragment>
            <Plane ref={planeRef} material-color={Colors.LightGrey}></Plane>
            <MapTile />
        </Fragment>
    );
};
