import { CL_Area } from 'classes/generic/area/area';

import { T_Coords, T_Position, T_Size } from 'types/generic';

import { E_GridCellStatus } from './enums';
import {
    T_Grid,
    T_GridCell,
    T_GridDirection,
    T_GridFindCoordsParams,
} from './types';

const DEFAULT_CELL: T_GridCell = { status: E_GridCellStatus.EMPTY };

export class CL_Grid<GT_GridCell extends T_GridCell> {
    private grid: T_Grid<GT_GridCell>;
    private numberOfRows: number;
    private numberOfCols: number;

    constructor(size: T_Size) {
        this.numberOfRows = size[0];
        this.numberOfCols = size[1];
        this.grid = this.generateGrid();
    }

    private generateGrid() {
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

    findCrossCoords(
        area: CL_Area,
        direction: T_GridDirection,
        cellChecker: (providedCell: GT_GridCell) => boolean,
    ) {
        const isRowDirected = direction === 'row';

        const {
            startingCoords: [currentRowIndex, currentColIndex],
            size: [requestedHeight, requestedWidth],
        } = area;

        const newStartingCoords: T_Coords = [
            isRowDirected ? currentRowIndex + 1 : currentRowIndex,
            !isRowDirected ? currentColIndex + 1 : currentColIndex,
        ];

        const newRequestedSize: T_Position = [
            isRowDirected ? requestedHeight - 1 : 1,
            isRowDirected ? 1 : requestedWidth - 1,
        ];

        return this.findCoordsFromLine({
            area: new CL_Area(newStartingCoords, newRequestedSize),
            direction,
            cellChecker,
        });
    }

    findCoords({
        area,
        direction = 'row',
        cellChecker = this.cellChecker,
    }: T_GridFindCoordsParams<GT_GridCell>): T_Coords[] {
        let foundCoords: T_Coords[] = [];

        const { startingRowIndex, startingColIndex, height, width } = area;

        if (direction === 'row') {
            for (
                let iteratorRowIndex = startingRowIndex;
                iteratorRowIndex < this.numberOfRows;
                iteratorRowIndex++
            ) {
                const newArea = new CL_Area(
                    [iteratorRowIndex, startingColIndex],
                    [height, width],
                );

                foundCoords = this.findCoordsFromLine({
                    area: newArea,
                    direction,
                    cellChecker,
                });

                if (foundCoords.length) break;
            }
        } else {
            for (
                let iteratorColIndex = startingColIndex;
                iteratorColIndex < this.numberOfRows;
                iteratorColIndex++
            ) {
                const newArea = new CL_Area(
                    [startingRowIndex, iteratorColIndex],
                    [width, height],
                );

                foundCoords = this.findCoordsFromLine({
                    area: newArea,
                    direction,
                    cellChecker,
                });

                if (foundCoords.length) break;
            }
        }

        return foundCoords;
    }

    findCoordsFromLine({
        area,
        direction = 'row',
        cellChecker = this.cellChecker,
    }: T_GridFindCoordsParams<GT_GridCell>): T_Coords[] {
        const isRowDirected = direction === 'row';

        const {
            startingRowIndex,
            startingColIndex,
            size: [requestedHeight, requestedWidth],
        } = area;

        const iteratorStartingIndex = isRowDirected
            ? startingColIndex
            : startingRowIndex;

        const iteratorMaxIndex = isRowDirected
            ? this.numberOfCols
            : this.numberOfRows;

        const shoudHaveCrossCoords = isRowDirected
            ? requestedHeight > 1
            : requestedWidth > 1;

        const requredLength = isRowDirected ? requestedWidth : requestedHeight;

        let foundCoords: T_Coords[] = [];
        let foundCrossCoords: T_Coords[] = [];

        for (
            let iteratorIndex = iteratorStartingIndex;
            iteratorIndex < iteratorMaxIndex;
            iteratorIndex++
        ) {
            const currentRowIndex = isRowDirected
                ? startingRowIndex
                : iteratorIndex;
            const currentColIndex = isRowDirected
                ? iteratorIndex
                : startingColIndex;

            const isCellMatches = cellChecker(
                this.grid[currentRowIndex][currentColIndex],
            );

            if (isCellMatches) {
                foundCoords.push([currentRowIndex, currentColIndex]);
            } else foundCoords = [];

            if (isCellMatches && shoudHaveCrossCoords) {
                const newArea = new CL_Area(
                    [currentRowIndex, currentColIndex],
                    [requestedHeight, requestedWidth],
                );

                const crossCoords = this.findCrossCoords(
                    newArea,
                    direction,
                    cellChecker,
                );

                if (crossCoords.length) {
                    foundCrossCoords = [...foundCrossCoords, ...crossCoords];
                } else {
                    foundCrossCoords = [];
                    foundCoords = [];
                }
            }

            if (foundCoords.length === requredLength) break;
        }

        return foundCoords.length === requredLength
            ? [...foundCoords, ...foundCrossCoords]
            : [];
    }

    updateCellsByCoords(
        coordsList: T_Coords[],
        newData: GT_GridCell,
    ): T_GridCell[] {
        return coordsList.map((coords) => {
            const [rowIndex, colIndex] = coords;
            this.grid[rowIndex][colIndex] = newData;
            return this.grid[rowIndex][colIndex];
        });
    }

    checkCellsByCoords(
        coordsList: T_Coords[],
        cellChecker = this.cellChecker,
    ): Boolean {
        for (let iterator = 0; iterator < coordsList.length; iterator++) {
            const [rowIndex, colIndex] = coordsList[iterator];
            const isCellMatvhes = cellChecker(this.grid[rowIndex][colIndex]);
            if (!isCellMatvhes) return false;
        }

        return true;
    }
}
