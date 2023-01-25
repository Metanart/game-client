import { FC, Fragment, ReactNode, useMemo } from 'react';

import { AxesHelper } from 'three';

import { Debug } from '@react-three/cannon';
import {
    GizmoHelper,
    GizmoViewport,
    OrbitControls,
    Stats,
} from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import { GAME_DEBUG_CONFIG } from 'components/game/config';

import { TK_Colors } from 'tokens/colors';
import { TK_Length } from 'tokens/measurements';

type Props = { children: ReactNode };

export const CM_GameDevtools: FC<Props> = (props) => {
    const { children } = props;
    const { scene } = useThree((state) => state);
    const {
        showPhysics,
        showStats,
        showGridHelper,
        useDevelopersCamera,
        showAxisController,
        showAxis,
    } = GAME_DEBUG_CONFIG;

    if (showAxisController) useMemo(() => scene.add(new AxesHelper(100)), []);

    return (
        <Fragment>
            {showAxis && (
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport
                        axisColors={['red', 'green', 'blue']}
                        labelColor="black"
                    />
                </GizmoHelper>
            )}

            {showStats && <Stats />}

            {useDevelopersCamera && <OrbitControls />}

            {showGridHelper && (
                <gridHelper
                    args={[
                        TK_Length.Hectometer,
                        TK_Length.Hectometer,
                        TK_Colors.Red,
                        TK_Colors.Teal,
                    ]}
                    position={[TK_Length.Meter / 2, 0.002, TK_Length.Meter / 2]}
                />
            )}
            {showPhysics ? <Debug>{children}</Debug> : children}
        </Fragment>
    );
};
