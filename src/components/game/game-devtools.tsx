import { FC, Fragment, ReactNode, useMemo } from 'react';

import { AxesHelper } from 'three';

import { GizmoHelper, GizmoViewport, OrbitControls, Stats } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import { DEBUG_CONFIG } from 'components/game/config';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

type Props = { children: ReactNode };

export const GameDevtools: FC<Props> = (props) => {
    const { children } = props;
    const { scene } = useThree((state) => state);
    const { showStats, showGridHelper, useDevelopersCamera, showAxisController, showAxis } = DEBUG_CONFIG;

    if (showAxisController) useMemo(() => scene.add(new AxesHelper(100)), []);

    return (
        <Fragment>
            {showAxis && (
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
                </GizmoHelper>
            )}

            {showStats && <Stats />}

            {useDevelopersCamera && <OrbitControls layers={3} makeDefault={true} />}

            {showGridHelper && (
                <gridHelper
                    args={[Length.Hectometer, Length.Hectometer, Colors.Red, Colors.Teal]}
                    position={[Length.Meter / 2, 0.002, Length.Meter / 2]}
                />
            )}

            {children}
        </Fragment>
    );
};
