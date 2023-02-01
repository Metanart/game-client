import { T_Coords, T_Size } from 'types/generic';

import {
    checkIfArrayIsSmaller,
    checkIfArrayIsSmallerOrEquival,
} from 'utils/arrays';

export class CL_Area {
    private height: number;
    private width: number;
    private size: T_Size;

    private startingRowIndex: number;
    private startingColIndex: number;
    private startingCoords: T_Coords;

    private endingRowIndex: number = 0;
    private endingColIndex: number = 0;
    private endingCoords: T_Coords = [0, 0];

    isCorrect = true;

    constructor(size: T_Size, coords: T_Coords = [0, 0]) {
        this.size = [...size];
        this.width = this.size[1];
        this.height = this.size[0];

        this.startingCoords = [...coords];
        this.startingRowIndex = this.startingCoords[0];
        this.startingColIndex = this.startingCoords[1];

        this.calculateEndingCoords();
        this.isCorrect = this.checkIsCorrect();
    }

    rotate() {
        this.height = this.size[1];
        this.width = this.size[0];
        this.size = [this.height, this.width];

        this.calculateEndingCoords();
        this.isCorrect = this.checkIsCorrect();

        return this;
    }

    calculateEndingCoords() {
        this.endingRowIndex = this.startingRowIndex + this.height;
        this.endingColIndex = this.startingColIndex + this.width;
        this.endingCoords = [this.endingRowIndex, this.endingColIndex];
    }

    checkIsCorrect(): boolean {
        if (checkIfArrayIsSmallerOrEquival(this.size, [0, 0])) return false;
        if (checkIfArrayIsSmaller(this.startingCoords, [0, 0])) return false;
        if (checkIfArrayIsSmaller(this.endingCoords, [0, 0])) return false;
        if (checkIfArrayIsSmaller(this.endingCoords, this.startingCoords))
            return false;

        return true;
    }

    getSize(): T_Size {
        return [this.height.valueOf(), this.width.valueOf()];
    }

    getStartingCoords(): T_Coords {
        return [
            this.startingRowIndex.valueOf(),
            this.startingColIndex.valueOf(),
        ];
    }

    getEndingCoords(): T_Coords {
        return [this.endingRowIndex.valueOf(), this.endingColIndex.valueOf()];
    }

    getData() {
        return {
            size: this.getSize(),
            startingCoords: this.getStartingCoords(),
            endingCoords: this.getEndingCoords(),
            isCorrect: this.isCorrect.valueOf(),
        };
    }
}
