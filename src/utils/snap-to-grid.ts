import { T_Position } from 'types/generic';

export function snapToGrid(
    position: T_Position,
    cellSize: number = 32,
): T_Position {
    const snappedY = Math.round(position[0] / cellSize) * cellSize;
    const snappedX = Math.round(position[1] / cellSize) * cellSize;
    return [snappedY, snappedX];
}
