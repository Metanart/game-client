import { FC } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { E_DragItem } from 'enums/drag-n-drop';

import { T_DragItem } from 'types/drag-n-drop';

import { TK_Spacing } from 'tokens/spacing';

import { T_InventoryProps, UI_Inventory } from 'ui/inventory/inventory';

import { CN_InventoryCell } from './inventory-cell';

type T_Props = Omit<T_InventoryProps, 'cell'>;

export const CN_Inventory: FC<T_Props> = (props) => {
    const { size, cellSize = TK_Spacing.xlg, children } = props;

    const handleItemDrop = (
        item: T_DragItem,
        monitor: DropTargetMonitor<T_DragItem>,
    ) => {
        const offset = monitor.getDifferenceFromInitialOffset() as {
            x: number;
            y: number;
        };

        item.onDrop([offset.y, offset.x]);
    };

    const handleItemHover = (
        item: T_DragItem,
        monitor: DropTargetMonitor<T_DragItem>,
    ) => {
        const offset = monitor.getDifferenceFromInitialOffset() as {
            x: number;
            y: number;
        };

        item.onHover([offset.y, offset.x]);
    };

    const [_, dropRef] = useDrop(
        () => ({
            accept: E_DragItem.InventorySlot,
            drop: handleItemDrop,
            hover: handleItemHover,
        }),
        [],
    );

    return (
        <UI_Inventory
            ref={dropRef}
            cellSize={cellSize}
            cell={<CN_InventoryCell />}
            size={size}
        >
            {children}
        </UI_Inventory>
    );
};
