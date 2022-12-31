import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';

import { Colors } from 'tokens/colors';

import { workbenchConfig } from './config';

import { Body, Box, Vec3 } from 'cannon-es';

export class Workbench extends Mesh {
    private body: Body;

    constructor() {
        const { width, height, depth } = workbenchConfig.dimensions;
        const geometry = new BoxGeometry(width, height, depth);
        const material = new MeshPhongMaterial({ color: Colors.Red }); // greenish blue

        super(geometry, material);

        this.position.setY(height / 2);

        // Cube body
        const shape = new Box(new Vec3(0.5, 0.5, 0.5));
        this.body = new Body({ mass: 5 });
        this.body.addShape(shape);
    }

    getBody() {
        return this.body;
    }
}
