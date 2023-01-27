import { FC, ReactNode, useCallback } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';

import { T_GridSize } from 'classes/generic/grid/types';

import { E_DragItem } from 'enums/drag-n-drop';

import { T_DragItem } from 'types/drag-n-drop';

import { UI_Inventory } from 'ui/inventory/inventory';

type T_Props = {
    size: T_GridSize;
    children: ReactNode;
};

export const CN_Inventory: FC<T_Props> = (props) => {
    const handleDrop = (
        item: T_DragItem,
        monitor: DropTargetMonitor<T_DragItem>,
    ) => {
        const offset = monitor.getDifferenceFromInitialOffset() as {
            x: number;
            y: number;
        };

        item.updatePosition(offset.y, offset.x);
    };

    const [monitor, dropRef] = useDrop(
        () => ({
            accept: E_DragItem.InventorySlot,
            drop: handleDrop,
            collect: (monitor) => ({
                monitor,
            }),
        }),
        [],
    );

    return (
        <div ref={dropRef}>
            <UI_Inventory size={props.size}>{props.children}</UI_Inventory>
        </div>
    );
};
