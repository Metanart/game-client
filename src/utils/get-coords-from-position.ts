import { T_Coords } from 'types/generic';
import { T_Position } from 'types/generic';

export const getCoordsFromPosition = (
    position: T_Position,
    cellSize: number,
): T_Coords => {
    return [position[0] / cellSize, position[1] / cellSize];
};
