import { E_GridCellStatus } from './enums';

export type T_Grid<TG_GridCell> = T_GridRow<TG_GridCell>[];

export type T_GridCell = { status: E_GridCellStatus };

export type T_GridRow<TG_GridCell> = TG_GridCell[];

export type T_GridSize = [height: number, width: number];

export type T_GridCoords = [rowIndex: number, colIndex: number];

export type T_GridFindCoordsParams<TG_GridCell> = {
    startingRowIndex?: number;
    startingColIndex?: number;
    requestedHeight?: number;
    requestedWidth?: number;
    direction?: 'row' | 'col';
    cellChecker?: (providedCell: TG_GridCell) => boolean;
};
