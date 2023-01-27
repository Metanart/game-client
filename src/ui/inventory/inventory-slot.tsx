import { FC, ReactNode } from 'react';

import { UI_GridCell } from 'ui/generic/grid/grid-cell';
import { SB_Box } from 'ui/storybook/box/box';

type T_Props = {
    children: ReactNode;
};

export const UI_InventorySlot: FC<T_Props> = (props) => {
    return (
        <UI_GridCell xs={1}>
            <SB_Box hasBorder={true}>{props.children}</SB_Box>
        </UI_GridCell>
    );
};
