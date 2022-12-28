import { DirectionalLight } from 'three';

export class Light extends DirectionalLight {
    constructor() {
        const color = 0xffffff;
        const intensity = 1;
        super(color, intensity);
        this.position.set(-1, 2, 4);
    }
}
