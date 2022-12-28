import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

import { Length } from 'global/measurements';

export class Player extends Mesh {
    constructor() {
        const boxWidth = Length.Decimeter * 4;
        const boxHeight = Length.Meter * 1.5;
        const boxDepth = Length.Decimeter * 4;
        const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);

        const material = new MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue
        super(geometry, material);

        this.position.setY(boxHeight / 2);
    }
}
