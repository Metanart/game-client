import { E_GridCellStatus } from './enums';
import {
    T_Grid,
    T_GridCell,
    T_GridCoords,
    T_GridFindCoordsParams,
    T_GridSize,
} from './types';

const DEFAULT_CELL: T_GridCell = { status: E_GridCellStatus.EMPTY };

const DEFAULT_GRID_SIZE: T_GridSize = [9, 9];

export class CL_Grid<TG_GridCell extends T_GridCell> {
    private grid: T_Grid<TG_GridCell>;
    private numberOfRows: number;
    private numberOfCols: number;

    constructor(size: T_GridSize = DEFAULT_GRID_SIZE) {
        this.numberOfRows = size[0];
        this.numberOfCols = size[1];
        this.grid = this.generateGrid();
    }

    private generateGrid() {
        const grid: T_Grid<TG_GridCell> = new Array(this.numberOfRows).fill(
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

    cellChecker(providedCell: TG_GridCell): boolean {
        return providedCell.status === E_GridCellStatus.EMPTY;
    }

    findCrossCoords(
        isRowDirected: boolean,
        currentRowIndex: number,
        currentColIndex: number,
        requestedHeight: number,
        requestedWidth: number,
        cellChecker: (providedCell: TG_GridCell) => boolean,
    ) {
        return this.findCoordsFromLine({
            startingRowIndex: isRowDirected
                ? currentRowIndex + 1
                : currentRowIndex,
            startingColIndex: !isRowDirected
                ? currentColIndex + 1
                : currentColIndex,
            requestedHeight: isRowDirected ? requestedHeight - 1 : 1,
            requestedWidth: isRowDirected ? 1 : requestedWidth - 1,
            direction: isRowDirected ? 'col' : 'row',
            cellChecker,
        });
    }

    checkRequestedSize(
        startingRowIndex: number,
        startingColIndex: number,
        requestedHeight: number,
        requestedWidth: number,
    ) {
        const endingRowIndex = startingRowIndex + requestedHeight;
        const endingColIndex = startingColIndex + requestedWidth;

        return (
            requestedWidth > 0 ||
            requestedHeight > 0 ||
            endingRowIndex < this.numberOfRows ||
            endingColIndex < this.numberOfCols
        );
    }

    findCoords({
        startingRowIndex = 0,
        startingColIndex = 0,
        requestedHeight = 1,
        requestedWidth = 1,
        direction = 'row',
        cellChecker = this.cellChecker,
    }: T_GridFindCoordsParams<TG_GridCell>): T_GridCoords[] {
        let foundCoords: T_GridCoords[] = [];

        if (direction === 'row') {
            for (
                let iteratorRowIndex = startingRowIndex;
                iteratorRowIndex < this.numberOfRows;
                iteratorRowIndex++
            ) {
                foundCoords = this.findCoordsFromLine({
                    startingRowIndex: iteratorRowIndex,
                    startingColIndex,
                    requestedHeight,
                    requestedWidth,
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
                foundCoords = this.findCoordsFromLine({
                    startingRowIndex,
                    startingColIndex: iteratorColIndex,
                    requestedHeight,
                    requestedWidth,
                    direction,
                    cellChecker,
                });

                if (foundCoords.length) break;
            }
        }

        return foundCoords;
    }

    findCoordsFromLine({
        startingRowIndex = 0,
        startingColIndex = 0,
        requestedHeight = 1,
        requestedWidth = 1,
        direction = 'row',
        cellChecker = this.cellChecker,
    }: T_GridFindCoordsParams<TG_GridCell>): T_GridCoords[] {
        const isRowDirected = direction === 'row';

        const isRequestedSizeAvailable = this.checkRequestedSize(
            startingRowIndex,
            startingColIndex,
            requestedHeight,
            requestedWidth,
        );

        if (!isRequestedSizeAvailable) return [];

        const iteratorStartingIndex = isRowDirected
            ? startingColIndex
            : startingRowIndex;
        const iteratorMaxIndex = isRowDirected
            ? this.numberOfCols
            : this.numberOfRows;

        let foundCoords: T_GridCoords[] = [];
        let foundCrossCoords: T_GridCoords[] = [];

        const shoudHaveCrossCoords = isRowDirected
            ? requestedHeight > 1
            : requestedWidth > 1;

        const requredLength = isRowDirected ? requestedWidth : requestedHeight;

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
                const crossCoords = this.findCrossCoords(
                    isRowDirected,
                    currentRowIndex,
                    currentColIndex,
                    requestedHeight,
                    requestedWidth,
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
        coordsList: T_GridCoords[],
        updatedCellData: TG_GridCell,
    ): T_GridCell[] {
        return coordsList.map((coords) => {
            const [rowIndex, colIndex] = coords;
            const iteratedCell = this.grid[rowIndex][colIndex];
            this.grid[rowIndex][colIndex] = updatedCellData;
            return iteratedCell;
        });
    }

    checkCellsByCoords(
        coordsList: T_GridCoords[],
        cellChecker = this.cellChecker,
    ): Boolean {
        for (let iterator = 0; iterator < coordsList.length; iterator++) {
            const [rowIndex, colIndex] = coordsList[iterator];
            const iteratedCell = this.grid[rowIndex][colIndex];
            const isCellMatvhes = cellChecker(iteratedCell);

            if (!isCellMatvhes) return false;
        }

        return true;
    }
}
