import { FC } from 'react';

import { usePlane } from '@react-three/cannon';
import { Plane } from '@react-three/drei';

import { MapTile } from 'components/map-tile/map-tile';

import { Colors } from 'tokens/colors';

export const Map: FC = () => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));

    return (
        <Plane ref={ref} args={[100, 100]} material-color={Colors.LightGrey}>
            <MapTile />
        </Plane>
    );
};
