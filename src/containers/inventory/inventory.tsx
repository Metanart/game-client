import { FC } from 'react';
import { DropTargetMonitor, useDrop, XYCoord } from 'react-dnd';

import { T_InventoryProps, UI_Inventory } from 'ui/inventory/inventory';

import { TK_Spacing } from 'tokens/spacing';

import { E_DragItem } from 'enums/drag-n-drop';

import { T_InventoryDragItem } from './types';

type T_Props = Omit<T_InventoryProps, 'cell'>;

export const CN_Inventory: FC<T_Props> = (props) => {
    const { size, cellSize = TK_Spacing.xlg, children } = props;

    const handleItemDrop = (
        item: T_InventoryDragItem,
        monitor: DropTargetMonitor<T_InventoryDragItem>,
    ) => {
        const offset = monitor.getDifferenceFromInitialOffset() as XYCoord;
        item.handleDrop([offset.y, offset.x]);
    };

    const handleItemHover = (
        item: T_InventoryDragItem,
        monitor: DropTargetMonitor<T_InventoryDragItem>,
    ) => {
        const offset = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const area = item.handleHover([offset.y, offset.x]);
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
        <UI_Inventory ref={dropRef} cellSize={cellSize} size={size}>
            {children}
        </UI_Inventory>
    );
};
