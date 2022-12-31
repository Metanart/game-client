import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import { code } from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';

import { playerConfig } from 'classes/player/config';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

import { Body, Box, Vec3 } from 'cannon-es';

export class Creature extends Mesh {
    private body: Body;

    constructor() {
        const { width, height, depth } = playerConfig.dimensions;
        const geometry = new BoxGeometry(width, height, depth);
        const material = new MeshPhongMaterial({ color: Colors.GreenishBlue }); // greenish blue

        super(geometry, material);

        this.position.setY(height / 2 + 1);

        // Cube body
        const shape = new Box(new Vec3(width / 2, height / 2, depth / 2));
        this.body = new Body({ mass: 50 });
        this.body.addShape(shape);
        this.body.position.set(this.body.position.x, this.body.position.y + 1, this.body.position.z);
    }

    getBody() {
        return this.body;
    }
}
