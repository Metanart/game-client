import { Mesh, MeshPhongMaterial, PlaneGeometry } from 'three';

export class MapTile extends Mesh {
    constructor() {
        const groundGeometry = new PlaneGeometry(10, 10);
        const groundMaterial = new MeshPhongMaterial({ color: 0xcc8866 });

        super(groundGeometry, groundMaterial);

        this.rotation.x = Math.PI * -0.5;
        this.receiveShadow = true;
    }
}
