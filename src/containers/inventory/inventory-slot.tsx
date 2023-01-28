import { CSSProperties, FC, ReactNode, useRef, useState } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrag } from 'react-dnd';

import { E_DragItem } from 'enums/drag-n-drop';

import { T_DragItem } from 'types/drag-n-drop';

import { UI_InventorySlot } from 'ui/inventory/inventory-slot';

type T_Props = {
    id: string;
    top?: number;
    left?: number;
    children?: ReactNode;
};

export const CN_InventorySlot: FC<T_Props> = (props) => {
    const { id, top = 0, left = 0, children } = props;

    const [position, setPosition] = useState({
        top,
        left,
    });

    const prevPosition = useRef({ position });

    const handleDndUpdatePosition = (offsetTop: number, offsetLeft: number) => {
        const newTop = prevPosition.current.position.top + offsetTop;
        const newLeft = prevPosition.current.position.left + offsetLeft;

        prevPosition.current.position = {
            top: newTop,
            left: newLeft,
        };

        setPosition({
            top: newTop,
            left: newLeft,
        });
    };

    const handleDndCollect = (monitor: DragSourceMonitor<T_DragItem>) => ({
        isDragging: !!monitor.isDragging(),
    });

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: E_DragItem.InventorySlot,
            item: {
                updatePosition: handleDndUpdatePosition,
            },
            collect: handleDndCollect,
        }),
        [id, top, left],
    );

    const inlineStyle: CSSProperties = {
        position: 'absolute',
        transform: `translate3d(${position.left}px, ${position.top}px, 0)`,
        opacity: isDragging ? '0.5' : '1',
        cursor: 'move',
    };

    return (
        <div ref={dragRef} style={inlineStyle}>
            <UI_InventorySlot size={[2, 2]}>{children}</UI_InventorySlot>
        </div>
    );
};
