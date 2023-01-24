import { EGridCellStatus } from './enums';

export type TGrid<TGGridCell> = TGridRow<TGGridCell>[];

export type TGridCell = { status: EGridCellStatus };

export type TGridRow<TGGridCell> = TGGridCell[];

export type TGridSize = [height: number, width: number];

export type TGridCoords = [rowIndex: number, colIndex: number];

export type TGridFindCoordsParams<TGGridCell> = {
    startingRowIndex?: number;
    startingColIndex?: number;
    requestedHeight?: number;
    requestedWidth?: number;
    direction?: 'row' | 'col';
    cellChecker?: (providedCell: TGGridCell) => boolean;
};
