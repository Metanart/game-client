import { describe, expect, test } from 'vitest';

import { textAlign } from '@mui/system';

import { CL_Area } from 'classes/generic/area/area';

import { E_GridCellStatus } from './enums';
import { CL_Grid } from './grid';
import { T_GridCell } from './types';

const grid = new CL_Grid([16, 18]);
const handleBusyCheck = (providedCell: T_GridCell) => {
    return providedCell.status === E_GridCellStatus.BUSY;
};

describe('Grid', () => {
    describe('Size', () => {
        test('16:18 size', () => {
            expect(grid.matrix.length).toBe(16);
            expect(grid.matrix[0].length).toBe(18);
        });
    });

    describe('Find by row', () => {
        test('Find 3:5 area one row', () => {
            const foundCoords = grid.findCoordsFromRow(new CL_Area([3, 5]));
            expect(foundCoords.length).toBe(5);
        });

        test('Find 4:6 area all coords by row', () => {
            const foundCoords = grid.findCoords(new CL_Area([4, 6]));
            expect(foundCoords.length).toBe(24);
        });

        test('Find whole grid coords by row', () => {
            const foundCoords = grid.findCoords(new CL_Area([16, 18]));
            expect(foundCoords.length).toBe(288);
        });
    });

    describe('Find by col', () => {
        test('Find 3:5 area first col', () => {
            const foundCoords = grid.findCoordsFromCol(new CL_Area([3, 5]));
            expect(foundCoords.length).toBe(3);
        });

        test('Find 5:5 area all coords by col', () => {
            const foundCoords = grid.findCoords(new CL_Area([5, 5]), 'column');
            expect(foundCoords.length).toBe(25);
        });
    });

    describe('Checks', () => {
        test('Check if grid is fully free', () => {
            const foundCoords = grid.findCoords(
                new CL_Area([16, 18]),
                'column',
            );
            expect(foundCoords.length).toBe(288);
        });

        test('Check if grid is fully busy', () => {
            const foundCoords = grid.findCoords(
                new CL_Area([16, 18]),
                'column',
                (providedCell: T_GridCell) => {
                    return providedCell.status === E_GridCellStatus.BUSY;
                },
            );
            expect(foundCoords.length).toBe(0);
        });
    });

    describe('Find and update', () => {
        const grid = new CL_Grid([10, 10]);

        test('Update whole grid to be BUSY', () => {
            const emptyCoords = grid.findCoords(new CL_Area([10, 10]));

            expect(emptyCoords.length).toBe(100);

            grid.updateCellsByCoords(emptyCoords, {
                status: E_GridCellStatus.BUSY,
            });

            const busyCoords = grid.findCoords(
                new CL_Area([10, 10]),
                'row',
                handleBusyCheck,
            );

            expect(busyCoords.length).toBe(100);
        });

        test('And there shouldnt be free corrds then', () => {
            const emptyCoords = grid.findCoords(new CL_Area([10, 10]));
            expect(emptyCoords.length).toBe(0);
        });
    });

    describe('Incorrect cases', () => {
        test('Find too big coords by row', () => {
            const foundCoords = grid.findCoords(new CL_Area([18, 16]));
            expect(foundCoords.length).toBe(0);
        });

        test('Find too big coords by col', () => {
            const foundCoords = grid.findCoords(new CL_Area([18, 16]));
            expect(foundCoords.length).toBe(0);
        });
    });
});
