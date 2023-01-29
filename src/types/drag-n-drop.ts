import { T_Position } from './generic';

export type T_DragItem = {
    onDrop: (offset: T_Position) => void;
    onHover: (offset: T_Position) => void;
};

export type T_DragPosition = [top: number, left: number];
