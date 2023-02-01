import { describe, expect, test } from 'vitest';

import { CL_Area } from './area';

const area = new CL_Area([6, 8], [1, 2]);
const smallestArea = new CL_Area([1, 1], [0, 0]);
const negativeSizeArea = new CL_Area([-1, -1], [0, 0]);
const nullSizeArea = new CL_Area([0, 0], [0, 0]);
const negativeCoordsArea = new CL_Area([1, 1], [-1, -1]);

describe('Area', () => {
    describe('Regular case', () => {
        test('Correct initial props', () => {
            const {
                size: [height, width],
                startingCoords: [startingRowIndex, startingColIndex],
                endingCoords: [endingRowIndex, endingColIndex],
            } = area.getData();

            expect(height).toBe(6);
            expect(width).toBe(8);
            expect(startingRowIndex).toBe(1);
            expect(startingColIndex).toBe(2);
            expect(endingRowIndex).toBe(7);
            expect(endingColIndex).toBe(10);
        });

        test('Correct rotated props', () => {
            area.rotate();

            const {
                size: [height, width],
                startingCoords: [startingRowIndex, startingColIndex],
                endingCoords: [endingRowIndex, endingColIndex],
            } = area.getData();

            expect(height).toBe(8);
            expect(width).toBe(6);
            expect(startingRowIndex).toBe(1);
            expect(startingColIndex).toBe(2);
            expect(endingRowIndex).toBe(9);
            expect(endingColIndex).toBe(8);
        });
    });

    describe('Smallest area', () => {
        test('Correct 1:1 cell on 0:0 coords', () => {
            const {
                size: [height, width],
                startingCoords: [startingRowIndex, startingColIndex],
                endingCoords: [endingRowIndex, endingColIndex],
                isCorrect,
            } = smallestArea.getData();

            expect(height).toBe(1);
            expect(width).toBe(1);
            expect(startingRowIndex).toBe(0);
            expect(startingColIndex).toBe(0);
            expect(endingRowIndex).toBe(1);
            expect(endingColIndex).toBe(1);
            expect(isCorrect).toBeTruthy();
        });
    });

    describe('Error cases', () => {
        test('Incorrect size', () => {
            expect(negativeSizeArea.isCorrect).toBeFalsy();
        });

        test('Incorrect 0:0 size', () => {
            expect(nullSizeArea.isCorrect).toBeFalsy();
        });

        test('Incorrect coords', () => {
            expect(negativeCoordsArea.isCorrect).toBeFalsy();
        });
    });
});
