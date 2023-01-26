import { ComponentProps } from 'react';

import {
    BoxProps,
    CylinderProps,
    PlaneProps,
    PublicApi,
    SphereProps,
} from '@react-three/cannon';
import { Box, Cylinder, Plane, Sphere } from '@react-three/drei';

export type T_BoxMeshProps = ComponentProps<typeof Box>;
export type T_BoxBodyProps = BoxProps;

export type T_SphereMeshProps = ComponentProps<typeof Sphere>;
export type T_SphereBodyProps = SphereProps;

export type T_CylinderMeshProps = ComponentProps<typeof Cylinder>;
export type T_CylinderBodyProps = CylinderProps;

export type T_PlaneMeshProps = ComponentProps<typeof Plane>;
export type T_PlaneBodyProps = PlaneProps;

export type T_PhysicalBody = PublicApi;
