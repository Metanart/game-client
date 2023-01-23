import { EGridCellStatus } from './enums';
import { TGrid, TGridCell, TGridSize } from './types';

const DEFAULT_CELL_STATUS = EGridCellStatus.EMPTY;

const DEFAULT_GRID_SIZE: TGridSize = [9, 9];

export class Grid {
    private grid: TGrid;
    private height: number;
    private width: number;

    constructor(size: TGridSize = DEFAULT_GRID_SIZE) {
        this.height = size[0];
        this.width = size[1];
        this.grid = this.generateGrid(...size);
    }

    private generateGrid(numberOfRows: number, numberOfCols: number) {
        const gridgrid = new Array(numberOfRows).fill(DEFAULT_CELL_STATUS);

        for (
            let iteratingRowId = 0;
            iteratingRowId < numberOfRows;
            iteratingRowId++
        ) {
            gridgrid[iteratingRowId] = new Array(numberOfCols).fill(
                DEFAULT_CELL_STATUS,
            );
        }

        return gridgrid;
    }

    private findCellsInRow(
        options: {
            selectedRowId: number;
            startingColId: number;
            requestedWidth: number;
            cellStatus: EGridCellStatus;
        } = {
            selectedRowId: 0,
            startingColId: 0,
            requestedWidth: 1,
            cellStatus: EGridCellStatus.EMPTY,
        },
    ): TGridCell[] {
        let foundRowCoords: TGridCell[] = [];

        const { selectedRowId, startingColId, requestedWidth, cellStatus } =
            options;

        if (selectedRowId > this.height || startingColId > this.width)
            return [];

        for (
            let iteratingColId = startingColId;
            iteratingColId < this.width;
            iteratingColId++
        ) {
            if (this.grid[selectedRowId][iteratingColId] === cellStatus) {
                foundRowCoords.push([
                    selectedRowId,
                    iteratingColId,
                ] as TGridCell);
            } else foundRowCoords = [];

            if (foundRowCoords.length === requestedWidth) break;
        }

        return foundRowCoords.length === requestedWidth ? foundRowCoords : [];
    }

    private findCellsInCol(
        options: {
            startingRowId: number;
            selectedColId: number;
            requestedHeight: number;
            cellStatus: EGridCellStatus;
        } = {
            startingRowId: 0,
            selectedColId: 0,
            requestedHeight: 1,
            cellStatus: EGridCellStatus.EMPTY,
        },
    ): TGridCell[] {
        let foundColCoords: TGridCell[] = [];

        const { startingRowId, selectedColId, requestedHeight, cellStatus } =
            options;

        if (startingRowId > this.height || selectedColId > this.width)
            return [];

        for (
            let iteratingRowId = startingRowId;
            iteratingRowId < this.height;
            iteratingRowId++
        ) {
            if (foundColCoords.length === requestedHeight) break;

            const endingRowId = iteratingRowId + requestedHeight;

            if (endingRowId > this.height) break;

            if (this.grid[iteratingRowId][selectedColId] === cellStatus) {
                foundColCoords.push([
                    iteratingRowId,
                    selectedColId,
                ] as TGridCell);
            } else foundColCoords = [];
        }

        return foundColCoords.length === requestedHeight ? foundColCoords : [];
    }

    private findOverlappingCells(options: {
        rowCells: TGridCell[];
        requestedHeight: number;
        cellStatus: EGridCellStatus;
    }): TGridCell[] {
        const { rowCells, requestedHeight, cellStatus } = options;

        let allFoundColCells: TGridCell[] = [];

        for (let iterator = 0; iterator < rowCells.length; iterator++) {
            const [rowId, colId] = rowCells[iterator];

            // I'm using the +1-1 hack
            // to avoid checking already checked 1st row cells
            const foundColCells = this.findCellsInCol({
                startingRowId: rowId + 1,
                selectedColId: colId,
                requestedHeight: requestedHeight - 1,
                cellStatus,
            });

            if (foundColCells.length) {
                allFoundColCells = [...allFoundColCells, ...foundColCells];
            } else return [];
        }

        return allFoundColCells;
    }

    findCells(
        requestedSize: TGridSize,
        cellStatus: EGridCellStatus = EGridCellStatus.EMPTY,
        startingCell: TGridCell = [0, 0],
    ): TGridCell[] {
        const [startingRowId, startingColId] = startingCell;
        const [requestedWidth, requestedHeight] = requestedSize;

        let foundRowCells: TGridCell[] = [];
        let foundOverlappingCells: TGridCell[] = [];

        if (
            requestedWidth === 0 ||
            requestedHeight === 0 ||
            requestedWidth > this.width ||
            requestedHeight > this.height
        )
            return [];

        for (
            let iteratingRowId = startingRowId;
            iteratingRowId < this.height;
            iteratingRowId++
        ) {
            foundRowCells = this.findCellsInRow({
                selectedRowId: iteratingRowId,
                startingColId,
                requestedWidth,
                cellStatus,
            });

            if (foundRowCells.length) {
                foundOverlappingCells = this.findOverlappingCells({
                    rowCells: foundRowCells,
                    requestedHeight,
                    cellStatus,
                });

                if (foundOverlappingCells.length) break;
            }
        }

        return foundRowCells.length && foundOverlappingCells.length
            ? [...foundRowCells, ...foundOverlappingCells]
            : [];
    }

    updateCellsStatus(
        cellsList: TGridCell[],
        newStatus: EGridCellStatus = EGridCellStatus.EMPTY,
    ): TGridCell[] {
        return cellsList.map((cell) => {
            const [rowId, colId] = cell;
            this.grid[rowId][colId] = newStatus;
            return cell;
        });
    }

    checkCellsStatus(
        cellsList: TGridCell[],
        status: EGridCellStatus = EGridCellStatus.EMPTY,
    ): Boolean {
        for (
            let iteratingCellId = 0;
            iteratingCellId < cellsList.length;
            iteratingCellId++
        ) {
            const [rowId, colId] = cellsList[iteratingCellId];

            if (this.grid[rowId][colId] !== status) {
                return false;
            }
        }

        return true;
    }
}
