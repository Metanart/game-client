import { FC, ReactNode } from 'react';

import { Canvas } from '@react-three/fiber';

export const Game: FC<{ children?: ReactNode }> = (props) => <Canvas>{props.children}</Canvas>;
