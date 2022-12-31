import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

import { Colors } from 'tokens/colors';

import { workbenchConfig } from './config';

export class Workbench extends Mesh {
    constructor() {
        const { width, height, depth } = workbenchConfig.dimensions;
        const geometry = new BoxGeometry(width, height, depth);
        const material = new MeshPhongMaterial({ color: Colors.Red }); // greenish blue

        super(geometry, material);

        this.position.setY(height / 2);
    }
}
