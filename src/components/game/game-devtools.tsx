import { FC, Fragment, ReactNode } from 'react';

import { Debug } from '@react-three/cannon';
import { OrbitControls, Stats } from '@react-three/drei';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

import { IS_DEVELOPMENT_MODE } from '../../constants/mode';

type Props = { children: ReactNode };

export const GameDevtools: FC<Props> = (props) => {
    if (!IS_DEVELOPMENT_MODE) return <Fragment>{props.children}</Fragment>;

    return (
        <Fragment>
            <Stats />
            <OrbitControls />
            <gridHelper
                args={[Length.Hectometer, Length.Hectometer, Colors.Red, Colors.Teal]}
                position={[Length.Meter / 2, 0.001, Length.Meter / 2]}
            />
            <Debug color="red">{props.children}</Debug>
        </Fragment>
    );
};
