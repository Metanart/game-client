import React, { FC, useRef } from 'react';

import { PlaneBufferGeometryProps } from '@react-three/fiber';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

type Props = {
    position?: [number, number];
};

export const MapTile: FC<Props> = (props) => {
    const { position = [0, 0] } = props;

    const mapTileRef = useRef<PlaneBufferGeometryProps>(null!);

    return (
        <mesh position={[position[0], 0, position[1]]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry ref={mapTileRef} attach="geometry" args={[Length.Meter, Length.Meter]} />
            <meshPhongMaterial attach="material" color={Colors.GreenishBlue} />
        </mesh>
    );
};
