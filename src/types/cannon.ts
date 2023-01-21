import { ComponentProps } from 'react';

import {
    BoxProps,
    CylinderProps,
    PlaneProps,
    PublicApi,
    SphereProps,
} from '@react-three/cannon';
import { Box, Cylinder, Plane, Sphere } from '@react-three/drei';

export type BoxMeshProps = ComponentProps<typeof Box>;
export type BoxBodyProps = BoxProps;

export type SphereMeshProps = ComponentProps<typeof Sphere>;
export type SphereBodyProps = SphereProps;

export type CylinderMeshProps = ComponentProps<typeof Cylinder>;
export type CylinderBodyProps = CylinderProps;

export type PlaneMeshProps = ComponentProps<typeof Plane>;
export type PlaneBodyProps = PlaneProps;

export type PhysicalBody = PublicApi;
