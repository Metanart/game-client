import { T_Coords, T_Size } from 'types/generic';

import { diff } from 'fast-array-diff';

export class CL_Area {
    height: number;
    width: number;
    size: T_Size;

    startingRowIndex: number;
    startingColIndex: number;
    startingCoords: T_Coords;

    endingRowIndex!: number;
    endingColIndex!: number;
    endingCoords!: T_Coords;

    isCorrect = true;

    constructor(
        size: T_Size,
        startingCoords: T_Coords = [0, 0],
        forceCheck = false,
    ) {
        this.size = [...size];
        this.width = this.size[1];
        this.height = this.size[0];

        this.startingCoords = [...startingCoords];
        this.startingRowIndex = this.startingCoords[0];
        this.startingColIndex = this.startingCoords[1];

        this.calculateEndingCoords();

        if (forceCheck) {
            this.isCorrect = this.checkIsCorrect();
        }
    }

    rotate(forceCheck = false) {
        this.height = this.size[1];
        this.width = this.size[0];
        this.size = [this.height, this.width];

        if (forceCheck) {
            this.isCorrect = this.checkIsCorrect();
        }
    }

    calculateEndingCoords() {
        this.endingRowIndex = this.startingRowIndex + this.height;
        this.endingColIndex = this.startingColIndex + this.width;
        this.endingCoords = [this.endingRowIndex, this.endingColIndex];
    }

    checkIsCorrect(): boolean {
        if (diff(this.startingCoords, [0, 0], (ia, ib) => ia < ib))
            return false;

        if (diff(this.endingCoords, [1, 1], (ia, ib) => ia < ib)) return false;

        if (diff(this.startingCoords, this.endingCoords, (ia, ib) => ia >= ib))
            return false;

        return true;
    }
}
