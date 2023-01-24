import { EGridCellStatus } from './enums';

export type TGrid<TGGridCell> = TGridRow<TGGridCell>[];

export type TGridCell = EGridCellStatus;

export type TGridRow<TGGridCell> = TGGridCell[];

export type TGridSize = [height: number, width: number];

export type TGridCoords = [rowId: number, colId: number];

export type TGridFindCoordsParams<TGGridCell> = {
    startingRowId?: number;
    startingColId?: number;
    requestedHeight?: number;
    requestedWidth?: number;
    direction?: 'row' | 'col';
    cellChecker?: (providedCell: TGGridCell) => boolean;
};
