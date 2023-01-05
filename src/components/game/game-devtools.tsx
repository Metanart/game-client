import { FC, Fragment, ReactNode, useMemo } from 'react';

import { AxesHelper } from 'three';

import { GizmoHelper, GizmoViewport, OrbitControls, Stats } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import { debugConfig } from 'constants/debug-config';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

type Props = { children: ReactNode };

export const GameDevtools: FC<Props> = (props) => {
    const { scene } = useThree((state) => state);
    const { children } = props;
    const { showStats, showGridHelper, useDevelopersCamera } = debugConfig;

    if (debugConfig.showAxisController) useMemo(() => scene.add(new AxesHelper(100)), []);

    return (
        <Fragment>
            {debugConfig.showAxis && (
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
                </GizmoHelper>
            )}

            {showStats && <Stats />}

            {useDevelopersCamera && <OrbitControls makeDefault={true} />}

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
