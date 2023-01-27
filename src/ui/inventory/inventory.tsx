import { FC, ReactNode } from 'react';

import { T_GridSize } from 'classes/generic/grid/types';

import { UI_Grid } from 'ui/generic/grid/grid';
import { UI_GridCell } from 'ui/generic/grid/grid-cell';
import { SB_Box } from 'ui/storybook/box/box';

import { styles } from './inventory.styles';

type T_Props = {
    size: T_GridSize;
    children?: ReactNode;
};

export const UI_Inventory: FC<T_Props> = (props) => {
    const {
        size: [height, width],
        children,
    } = props;

    const renderGridCell = (rowIndex: number, colIndex: number) => {
        const key = `${rowIndex + 1}:${colIndex + 1}`;

        return (
            <UI_GridCell xs={1} key={key}>
                <SB_Box hasBorder={true}>{key}</SB_Box>
            </UI_GridCell>
        );
    };

    const gridCells = [...new Array(height)].map((_, rowIndex) => {
        return [...new Array(width)].map((_, colIndex) =>
            renderGridCell(rowIndex, colIndex),
        );
    });

    return (
        <div css={styles.root}>
            <div css={styles.grid}>
                <UI_Grid columns={width}>{gridCells}</UI_Grid>
            </div>
            <div css={styles.slots}>{children}</div>
        </div>
    );
};
