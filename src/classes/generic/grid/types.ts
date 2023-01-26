import { E_GridCellStatus } from './enums';

export type T_Grid<GT_GridCell> = T_GridRow<GT_GridCell>[];

export type T_GridCell = { status: E_GridCellStatus };

export type T_GridRow<GT_GridCell> = GT_GridCell[];

export type T_GridSize = [height: number, width: number];

export type T_GridCoords = [rowIndex: number, colIndex: number];

export type T_GridFindCoordsParams<GT_GridCell> = {
    startingRowIndex?: number;
    startingColIndex?: number;
    requestedHeight?: number;
    requestedWidth?: number;
    direction?: 'row' | 'col';
    cellChecker?: (providedCell: GT_GridCell) => boolean;
};
