import { FC, ReactNode, useRef, useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';

import { CL_Area } from 'classes/generic/area/area';

import { UI_InventorySlot } from 'ui/inventory/inventory-slot';

import { T_Position, T_Size } from 'types/generic';

import { E_DragItem } from 'enums/drag-n-drop';

import { T_InventoryDragItem } from './types';

import { getCoordsFromPosition } from 'utils/get-coords-from-position';
import { snapToGrid } from 'utils/snap-to-grid';

import { diff } from 'fast-array-diff';
import { add } from 'mathjs';

type T_Props = {
    size?: T_Size;
    cellSize?: number;
    initialPosition?: T_Position;
    children?: ReactNode;
};

export const CN_InventorySlot: FC<T_Props> = (props) => {
    const {
        size = [2, 2],
        cellSize = 32,
        initialPosition = [0, 0],
        children,
    } = props;

    const [position, setPosition] = useState<T_Position>(initialPosition);
    const prevPosition = useRef<T_Position>(initialPosition);
    const prevHoverPosition = useRef<T_Position>(initialPosition);

    const handleDrop = (offset: T_Position) => {
        const newPosition = snapToGrid(
            add(prevPosition.current, offset),
            cellSize,
        );

        if (diff(prevPosition.current, newPosition).added.length) {
            prevPosition.current = newPosition;
            setPosition(newPosition);
        }
    };

    const handleHover = (offset: T_Position): CL_Area | undefined => {
        const newHoverPosition = snapToGrid(
            add(prevPosition.current, offset),
            cellSize,
        );

        if (diff(prevHoverPosition.current, newHoverPosition).added.length) {
            prevHoverPosition.current = newHoverPosition;
            setPosition(newHoverPosition);

            return new CL_Area(
                size,
                getCoordsFromPosition(newHoverPosition, cellSize),
            );
        } else return;
    };

    const handleCollect = (
        monitor: DragSourceMonitor<T_InventoryDragItem>,
    ) => ({
        isDragging: !!monitor.isDragging(),
    });

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: E_DragItem.InventorySlot,
            item: {
                handleDrop,
                handleHover,
            },
            collect: handleCollect,
        }),
        [],
    );

    return (
        <UI_InventorySlot
            ref={dragRef}
            size={size}
            cellSize={cellSize}
            position={position}
            isDragging={isDragging}
        >
            {children}
        </UI_InventorySlot>
    );
};
