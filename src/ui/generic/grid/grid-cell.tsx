import { FC, ReactNode } from 'react';

import { Grid, GridProps } from '@mui/material';

type Props = {
    children: ReactNode;
} & Pick<GridProps, 'spacing' | 'columns'>;

export const UI_GridCell: FC<Props> = (props) => {
    const { children } = props;

    return <Grid>{children}</Grid>;
};
