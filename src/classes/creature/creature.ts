import { BoxGeometry, Mesh, MeshPhongMaterial } from 'three';
import { code } from 'three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements';

import { playerConfig } from 'classes/player/config';

import { Colors } from 'tokens/colors';
import { Length } from 'tokens/measurements';

export class Creature extends Mesh {
    constructor() {
        const { width, height, depth } = playerConfig.dimensions;
        const geometry = new BoxGeometry(width, height, depth);
        const material = new MeshPhongMaterial({ color: Colors.GreenishBlue }); // greenish blue

        super(geometry, material);

        this.position.setY(height / 2);
    }
}
