import { forwardRef, ReactNode } from 'react';

import { UI_Grid } from 'ui/generic/grid/grid';
import { UI_GridCell } from 'ui/generic/grid/grid-cell';

import { TK_Spacing } from 'tokens/spacing';

import { T_Size } from 'types/generic';

import { UI_InventoryCell } from './inventory-cell';

export type T_InventoryProps = {
    size: T_Size;
    cellSize: number;
    children?: ReactNode;
};

export const UI_Inventory = forwardRef<HTMLDivElement, T_InventoryProps>(
    (props, ref) => {
        const {
            size: [height, width] = [1, 1],
            cellSize = TK_Spacing.xlg,
            children,
        } = props;

        const renderGridCell = (rowIndex: number, colIndex: number) => {
            const key = `${rowIndex + 1}:${colIndex + 1}`;

            return (
                <UI_GridCell height={cellSize} width={cellSize} key={key}>
                    <UI_InventoryCell />
                </UI_GridCell>
            );
        };

        const gridCells = [...new Array(height)].map((_, rowIndex) => {
            return [...new Array(width)].map((_, colIndex) =>
                renderGridCell(rowIndex, colIndex),
            );
        });

        return (
            <div ref={ref} style={{ width: width * cellSize }}>
                <UI_Grid columns={width}>
                    {gridCells}
                    {children}
                </UI_Grid>
            </div>
        );
    },
);
