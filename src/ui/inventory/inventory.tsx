import { forwardRef, ReactNode } from 'react';

import { T_GridSize } from 'classes/generic/grid/types';

import { TK_Spacing } from 'tokens/spacing';

import { UI_Grid } from 'ui/generic/grid/grid';
import { UI_GridCell } from 'ui/generic/grid/grid-cell';

import { styles } from './inventory.styles';

export type T_InventoryProps = {
    cell: ReactNode;
    size: T_GridSize;
    cellSize: number;
    children?: ReactNode;
};

export const UI_Inventory = forwardRef<HTMLDivElement, T_InventoryProps>(
    (props, ref) => {
        const {
            cell,
            size: [height, width] = [1, 1],
            cellSize = TK_Spacing.xlg,
            children,
        } = props;

        const renderGridCell = (rowIndex: number, colIndex: number) => {
            const key = `${rowIndex + 1}:${colIndex + 1}`;

            return (
                <UI_GridCell height={cellSize} width={cellSize} key={key}>
                    {cell}
                </UI_GridCell>
            );
        };

        const gridCells = [...new Array(height)].map((_, rowIndex) => {
            return [...new Array(width)].map((_, colIndex) =>
                renderGridCell(rowIndex, colIndex),
            );
        });

        return (
            <div
                ref={ref}
                css={styles.root}
                style={{ width: width * cellSize }}
            >
                <div css={styles.grid}>
                    <UI_Grid columns={width}>{gridCells}</UI_Grid>
                </div>
                <div css={styles.slots}>{children}</div>
            </div>
        );
    },
);
