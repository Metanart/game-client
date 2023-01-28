import { FC, ReactNode } from 'react';

import { Grid, GridProps } from '@mui/material';

type T_Props = Pick<GridProps, 'height' | 'width' | 'xs'> & {
    children: ReactNode;
};

export const UI_GridCell: FC<T_Props> = (props) => {
    const { children } = props;

    return (
        <Grid item={true} {...props}>
            {children}
        </Grid>
    );
};
