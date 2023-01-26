import { FC, ReactNode } from 'react';

import { useStyles } from './box.styles';

type Props = {
    children?: ReactNode;
    height?: number;
    width?: number;
    backgroundColor?: string;
};

export const SB_Box: FC<Props> = (props) => {
    const { children, height, width, backgroundColor } = props;

    const styles = useStyles({ height, width, backgroundColor });

    return <div css={styles.root}>{children}</div>;
};
