import { FC, ReactNode } from 'react';

import { TK_Grey } from 'tokens/colors';

import { useStyles } from './box.styles';

type T_Props = {
    height?: number;
    width?: number;
    backgroundColor?: string;
    hasBorder?: boolean;
    children?: ReactNode;
};

export const SB_Box: FC<T_Props> = (props) => {
    const {
        height = 'auto',
        width = 'auto',
        backgroundColor = TK_Grey[100],
        hasBorder,
        children,
    } = props;

    const styles = useStyles({ height, width, backgroundColor, hasBorder });

    return <div css={styles.root}>{children}</div>;
};
