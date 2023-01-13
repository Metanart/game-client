import { ComponentProps, FC } from 'react';

import { BoxProps, useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

import '@react-three/fiber';

type WorkbenchBodyProps = BoxProps;
type WorkbenchMeshProps = ComponentProps<typeof Box>;

const workbenchMeshProps: WorkbenchMeshProps = {
    args: [1, 4, 6],
    position: [0, 2, 2],
    rotation: [0, Math.PI / 2, 0],
};

const workbenchBodyProps: WorkbenchBodyProps = {
    mass: 1000,
    ...(workbenchMeshProps as WorkbenchBodyProps),
};

export const Workbench: FC = () => {
    const [workbenchBodyRef] = useBox(() => workbenchBodyProps);

    return <Box ref={workbenchBodyRef} {...workbenchMeshProps} />;
};
