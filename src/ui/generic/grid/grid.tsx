import { FC, ReactNode } from 'react';

import { Grid, GridProps } from '@mui/material';

type T_Props = Pick<GridProps, 'spacing' | 'rowSpacing' | 'columns'> & {
    children: ReactNode;
};

export const UI_Grid: FC<T_Props> = (props) => {
    return (
        <Grid container={true} {...props}>
            {props.children}
        </Grid>
    );
};
