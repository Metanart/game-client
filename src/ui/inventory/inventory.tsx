import { FC, ReactNode } from 'react';

import { UI_Grid } from 'ui/generic/grid/grid';

type T_Props = {
    columns: number;
    children: ReactNode;
};

export const UI_Inventory: FC<T_Props> = (props) => {
    return <UI_Grid columns={props.columns}>{props.children}</UI_Grid>;
};
