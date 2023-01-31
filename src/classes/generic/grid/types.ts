import { CL_Area } from 'classes/generic/area/area';

import { E_GridCellStatus } from './enums';

export type T_Grid<GT_GridCell> = T_GridRow<GT_GridCell>[];

export type T_GridCell = { status: E_GridCellStatus };

export type T_GridRow<GT_GridCell> = GT_GridCell[];

export type T_GridDirection = 'row' | 'column';

export type T_GridFindCoordsParams<GT_GridCell> = {
    area: CL_Area;
    direction?: T_GridDirection;
    cellChecker?: (providedCell: GT_GridCell) => boolean;
};
