import { Mesh, MeshPhongMaterial, PlaneGeometry } from 'three';

import { Body, Plane } from 'cannon-es';

export class MapTile extends Mesh {
    private body: Body;

    constructor() {
        const groundGeometry = new PlaneGeometry(10, 10);
        const groundMaterial = new MeshPhongMaterial({ color: 0xcc8866 });

        super(groundGeometry, groundMaterial);

        this.rotation.x = Math.PI * -0.5;
        this.receiveShadow = true;

        // Floor
        const shape = new Plane();
        this.body = new Body({ mass: 0 });
        this.body.addShape(shape);
        this.body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    }

    getBody() {
        return this.body;
    }
}
