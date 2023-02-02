import { CL_Area } from 'classes/generic/area/area';

import { T_Coords, T_Size } from 'types/generic';

import { E_GridCellStatus } from './enums';
import { T_Grid, T_GridCell, T_GridDirection } from './types';

const DEFAULT_CELL: T_GridCell = { status: E_GridCellStatus.EMPTY };

export class CL_Grid<GT_GridCell extends T_GridCell> {
    matrix: T_Grid<GT_GridCell>;
    numberOfRows: number;
    numberOfCols: number;

    constructor(size: T_Size) {
        this.numberOfRows = size[0];
        this.numberOfCols = size[1];
        this.matrix = this.generateGrid();
    }

    generateGrid() {
        const grid: T_Grid<GT_GridCell> = new Array(this.numberOfRows).fill(
            DEFAULT_CELL,
        );

        for (
            let iteratingRowIndex = 0;
            iteratingRowIndex < this.numberOfRows;
            iteratingRowIndex++
        ) {
            grid[iteratingRowIndex] = new Array(this.numberOfCols).fill(
                DEFAULT_CELL,
            );
        }

        return grid;
    }

    cellChecker(providedCell: GT_GridCell): boolean {
        return providedCell.status === E_GridCellStatus.EMPTY;
    }

    updateCellsByCoords(
        coordsList: T_Coords[],
        newData: GT_GridCell,
    ): T_GridCell[] {
        return coordsList.map((coords) => {
            const [rowIndex, colIndex] = coords;
            this.matrix[rowIndex][colIndex] = newData;
            return this.matrix[rowIndex][colIndex];
        });
    }

    checkCellsByCoords(
        coordsList: T_Coords[],
        cellChecker = this.cellChecker,
    ): Boolean {
        for (let iterator = 0; iterator < coordsList.length; iterator++) {
            const [rowIndex, colIndex] = coordsList[iterator];
            const isCellMatvhes = cellChecker(this.matrix[rowIndex][colIndex]);
            if (!isCellMatvhes) return false;
        }

        return true;
    }

    findCoords(
        area: CL_Area,
        direction: T_GridDirection = 'row',
        cellChecker = this.cellChecker,
    ): T_Coords[] {
        let foundCoords: T_Coords[] = [];

        const areaSize = area.getSize();
        const [startingRowIndex, startingColIndex] = area.getStartingCoords();

        if (direction === 'row') {
            for (
                let iteratorRowIndex = startingRowIndex;
                iteratorRowIndex < this.numberOfRows;
                iteratorRowIndex++
            ) {
                const newArea = new CL_Area(areaSize, [
                    iteratorRowIndex,
                    startingColIndex,
                ]);

                foundCoords = this.findCoordsFromRow(
                    newArea,
                    cellChecker,
                    true,
                );

                if (foundCoords.length) break;
            }
        } else {
            for (
                let iteratorColIndex = startingColIndex;
                iteratorColIndex < this.numberOfCols;
                iteratorColIndex++
            ) {
                const newArea = new CL_Area(areaSize, [
                    startingRowIndex,
                    iteratorColIndex,
                ]);

                foundCoords = this.findCoordsFromCol(
                    newArea,
                    cellChecker,
                    true,
                );

                if (foundCoords.length) break;
            }
        }

        return foundCoords;
    }

    findCoordsFromRow(
        area: CL_Area,
        cellChecker = this.cellChecker,
        checkCrossCoords = false,
    ) {
        const [startingRowIndex, startingColIndex] = area.getStartingCoords();
        const [requestedHeight, requestedWidth] = area.getSize();
        const hasCrossCoords = requestedHeight > 1;

        let foundCoords: T_Coords[] = [];
        let foundCrossCoords: T_Coords[] = [];

        for (
            let currentColIndex = startingColIndex.valueOf();
            currentColIndex < this.numberOfCols;
            currentColIndex++
        ) {
            const isCellMatches = cellChecker(
                this.matrix[startingRowIndex][currentColIndex],
            );

            if (isCellMatches) {
                foundCoords.push([startingRowIndex, currentColIndex]);
            } else foundCoords = [];

            if (checkCrossCoords && isCellMatches && hasCrossCoords) {
                const crossArea = new CL_Area(
                    [requestedHeight - 1, requestedWidth],
                    [startingRowIndex + 1, currentColIndex],
                );

                const crossCoords = this.findCoordsFromCol(
                    crossArea,
                    cellChecker,
                );

                if (crossCoords.length) {
                    foundCrossCoords = [...foundCrossCoords, ...crossCoords];
                } else {
                    foundCrossCoords = [];
                    foundCoords = [];
                }
            }

            if (foundCoords.length === requestedWidth) break;
        }

        return foundCoords.length === requestedWidth
            ? [...foundCoords, ...foundCrossCoords]
            : [];
    }

    findCoordsFromCol(
        area: CL_Area,
        cellChecker = this.cellChecker,
        checkCrossCoords: boolean = false,
    ): T_Coords[] {
        const [startingRowIndex, startingColIndex] = area.getStartingCoords();
        const [requestedHeight, requestedWidth] = area.getSize();
        const hasCrossCoords = requestedHeight > 1;

        let foundCoords: T_Coords[] = [];
        let foundCrossCoords: T_Coords[] = [];

        for (
            let currentRowIndex = startingRowIndex;
            currentRowIndex < this.numberOfRows;
            currentRowIndex++
        ) {
            const isCellMatches = cellChecker(
                this.matrix[currentRowIndex][startingColIndex],
            );

            if (isCellMatches) {
                foundCoords.push([currentRowIndex, startingColIndex]);
            } else foundCoords = [];

            if (checkCrossCoords && isCellMatches && hasCrossCoords) {
                const crossArea = new CL_Area(
                    [requestedHeight, requestedWidth - 1],
                    [currentRowIndex, startingColIndex + 1],
                );

                const crossCoords = this.findCoordsFromRow(
                    crossArea,
                    cellChecker,
                );

                if (crossCoords.length) {
                    foundCrossCoords = [...foundCrossCoords, ...crossCoords];
                } else {
                    foundCrossCoords = [];
                    foundCoords = [];
                }
            }

            if (foundCoords.length === requestedHeight) break;
        }

        return foundCoords.length === requestedHeight
            ? [...foundCoords, ...foundCrossCoords]
            : [];
    }
}
