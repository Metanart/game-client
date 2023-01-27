import { FC, ReactNode } from 'react';

import { Grid, GridProps } from '@mui/material';

type Props = {
    children: ReactNode;
} & Pick<GridProps, 'spacing' | 'rowSpacing' | 'columns'>;

export const UI_Grid: FC<Props> = (props) => {
    return (
        <Grid container={true} {...props}>
            {props.children}
        </Grid>
    );
};
