import { FC, Fragment } from 'react';

import { OrbitControls, Stats } from '@react-three/drei';

import { Colors } from 'tokens/colors';

export const GameDevtools: FC = () => {
    return (
        <Fragment>
            <Stats />
            <OrbitControls />
            <gridHelper args={[100, 100, Colors.Red, 'teal']} position={[0.5, 0, 0.5]} />
        </Fragment>
    );
};
