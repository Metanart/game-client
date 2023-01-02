import { FC, Fragment } from 'react';

import { OrbitControls, Stats } from '@react-three/drei';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

export const GameDevtools: FC = () => {
    return (
        <Fragment>
            <Stats />
            <OrbitControls />
            <gridHelper
                args={[Length.Hectometer, Length.Kilometer, Colors.Red, Colors.Teal]}
                position={[Length.Meter / 2, 0, Length.Meter / 2]}
            />
        </Fragment>
    );
};
