import React, { FC } from 'react';

import { Plane } from '@react-three/drei';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

export const MapTile: FC = (props) => {
    return (
        <Plane
            args={[Length.Meter, Length.Meter]}
            rotation={[-Math.PI / 2, 0, 0]}
            material-color={Colors.GreenishBlue}
        />
    );
};
