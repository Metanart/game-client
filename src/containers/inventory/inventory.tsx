import { FC, ReactNode, useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { T_GridSize } from 'classes/generic/grid/types';

import { E_DragItem } from 'enums/drag-n-drop';

import { T_DragItem } from 'types/drag-n-drop';

import { TK_Spacing } from 'tokens/spacing';

import { UI_Inventory } from 'ui/inventory/inventory';

type T_Props = {
    size: T_GridSize;
    cellSize?: number;
    children: ReactNode;
};

function snapToGrid(
    y: number,
    x: number,
    cellSize: number = 32,
): [number, number] {
    const snappedY = Math.round(y / cellSize) * cellSize;
    const snappedX = Math.round(x / cellSize) * cellSize;
    return [snappedY, snappedX];
}

export const CN_Inventory: FC<T_Props> = (props) => {
    const { size, cellSize = TK_Spacing.xlg, children } = props;

    const handleDndDrop = (
        item: T_DragItem,
        monitor: DropTargetMonitor<T_DragItem>,
    ) => {
        const offset = monitor.getDifferenceFromInitialOffset() as {
            x: number;
            y: number;
        };

        const [gridOffsetY, gridOffsetX] = snapToGrid(
            offset.y,
            offset.x,
            cellSize,
        );

        item.updatePosition(gridOffsetY, gridOffsetX);
    };

    const handleDndCollect = (monitor: DropTargetMonitor<T_DragItem>) => ({
        monitor,
    });

    const [monitor, dropRef] = useDrop(
        () => ({
            accept: E_DragItem.InventorySlot,
            drop: handleDndDrop,
            collect: handleDndCollect,
        }),
        [],
    );

    return (
        <div ref={dropRef}>
            <UI_Inventory size={size}>{children}</UI_Inventory>
        </div>
    );
};
