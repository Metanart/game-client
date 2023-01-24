import { EGridCellStatus } from './enums';
import {
    TGrid,
    TGridCell,
    TGridCoords,
    TGridFindCoordsParams,
    TGridSize,
} from './types';

const DEFAULT_CELL: TGridCell = EGridCellStatus.EMPTY;

const DEFAULT_GRID_SIZE: TGridSize = [9, 9];

export class Grid<TGGridCell extends TGridCell> {
    private grid: TGrid<TGGridCell>;
    private numberOfRows: number;
    private numberOfCols: number;

    constructor(size: TGridSize = DEFAULT_GRID_SIZE) {
        this.numberOfRows = size[0];
        this.numberOfCols = size[1];
        this.grid = this.generateGrid();
    }

    private generateGrid() {
        const grid: TGrid<TGGridCell> = new Array(this.numberOfRows).fill(
            DEFAULT_CELL,
        );

        for (
            let iteratingRowId = 0;
            iteratingRowId < this.numberOfRows;
            iteratingRowId++
        ) {
            grid[iteratingRowId] = new Array(this.numberOfCols).fill(
                DEFAULT_CELL,
            );
        }

        return grid;
    }

    cellChecker(providedCell: TGGridCell): boolean {
        return providedCell === EGridCellStatus.EMPTY;
    }

    findCrossCoords(
        isRowDirected: boolean,
        currentRowId: number,
        currentColId: number,
        requestedHeight: number,
        requestedWidth: number,
        cellChecker: (providedCell: TGGridCell) => boolean,
    ) {
        return this.findCoordsFromLine({
            startingRowId: isRowDirected ? currentRowId + 1 : currentRowId,
            startingColId: !isRowDirected ? currentColId + 1 : currentColId,
            requestedHeight: isRowDirected ? requestedHeight - 1 : 1,
            requestedWidth: isRowDirected ? 1 : requestedWidth - 1,
            direction: isRowDirected ? 'col' : 'row',
            cellChecker,
        });
    }

    checkRequestedSize(
        startingRowId: number,
        startingColId: number,
        requestedHeight: number,
        requestedWidth: number,
    ) {
        const endingRowId = startingRowId + requestedHeight;
        const endingColId = startingColId + requestedWidth;

        return (
            requestedWidth > 0 ||
            requestedHeight > 0 ||
            endingRowId < this.numberOfRows ||
            endingColId < this.numberOfCols
        );
    }

    findCoords({
        startingRowId = 0,
        startingColId = 0,
        requestedHeight = 1,
        requestedWidth = 1,
        direction = 'row',
        cellChecker = this.cellChecker,
    }: TGridFindCoordsParams<TGGridCell>): TGridCoords[] {
        let foundCoords: TGridCoords[] = [];

        if (direction === 'row') {
            for (
                let iteratorRowId = startingRowId;
                iteratorRowId < this.numberOfRows;
                iteratorRowId++
            ) {
                foundCoords = this.findCoordsFromLine({
                    startingRowId: iteratorRowId,
                    startingColId,
                    requestedHeight,
                    requestedWidth,
                    direction,
                    cellChecker,
                });

                if (foundCoords.length) break;
            }
        } else {
            for (
                let iteratorColId = startingColId;
                iteratorColId < this.numberOfRows;
                iteratorColId++
            ) {
                foundCoords = this.findCoordsFromLine({
                    startingRowId,
                    startingColId: iteratorColId,
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
        startingRowId = 0,
        startingColId = 0,
        requestedHeight = 1,
        requestedWidth = 1,
        direction = 'row',
        cellChecker = this.cellChecker,
    }: TGridFindCoordsParams<TGGridCell>): TGridCoords[] {
        const isRowDirected = direction === 'row';

        const isRequestedSizeAvailable = this.checkRequestedSize(
            startingRowId,
            startingColId,
            requestedHeight,
            requestedWidth,
        );

        if (!isRequestedSizeAvailable) return [];

        const iteratorStartingId = isRowDirected
            ? startingColId
            : startingRowId;
        const iteratorMaxId = isRowDirected
            ? this.numberOfCols
            : this.numberOfRows;

        let foundCoords: TGridCoords[] = [];
        let foundCrossCoords: TGridCoords[] = [];

        const shoudHaveCrossCoords = isRowDirected
            ? requestedHeight > 1
            : requestedWidth > 1;

        const requredLength = isRowDirected ? requestedWidth : requestedHeight;

        for (
            let iteratorId = iteratorStartingId;
            iteratorId < iteratorMaxId;
            iteratorId++
        ) {
            const currentRowId = isRowDirected ? startingRowId : iteratorId;
            const currentColId = isRowDirected ? iteratorId : startingColId;

            const isCellMatches = cellChecker(
                this.grid[currentRowId][currentColId],
            );

            if (isCellMatches) {
                foundCoords.push([currentRowId, currentColId]);
            } else foundCoords = [];

            if (isCellMatches && shoudHaveCrossCoords) {
                const crossCoords = this.findCrossCoords(
                    isRowDirected,
                    currentRowId,
                    currentColId,
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
        coordsList: TGridCoords[],
        updatedCellData: TGGridCell,
    ): TGridCell[] {
        return coordsList.map((coords) => {
            const [rowId, colId] = coords;
            const iteratedCell = this.grid[rowId][colId];
            this.grid[rowId][colId] = updatedCellData;
            return iteratedCell;
        });
    }

    checkCellsByCoords(
        coordsList: TGridCoords[],
        cellChecker = this.cellChecker,
    ): Boolean {
        for (let iterator = 0; iterator < coordsList.length; iterator++) {
            const [rowId, colId] = coordsList[iterator];
            const iteratedCell = this.grid[rowId][colId];
            const isCellMatvhes = cellChecker(iteratedCell);

            if (!isCellMatvhes) return false;
        }

        return true;
    }
}
