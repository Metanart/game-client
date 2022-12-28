import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

export class Player extends Mesh {
    constructor() {
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        const geometry = new BoxGeometry(boxWidth, boxHeight, boxDepth);
        const material = new MeshPhongMaterial({ color: 0x44aa88 }); // greenish blue
        super(geometry, material);
    }

    render(time: number) {
        time *= 0.001; // convert time to seconds

        this.rotation.x = time / 2;
        this.rotation.y = time / 2;
    }
}
