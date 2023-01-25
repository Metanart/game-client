import { FC, ReactNode } from 'react';
import { CSSProperties } from 'react';

import { TK_Grey } from 'tokens/colors';

type Props = {
    children: ReactNode;
    height?: number;
    width?: number;
};

export const SB_Box: FC<Props> = (props) => {
    const { children, height, width } = props;

    const inlineStyles: CSSProperties = {
        height,
        width,
        backgroundColor: TK_Grey[200],
    };

    return <div style={inlineStyles}>{children}</div>;
};
