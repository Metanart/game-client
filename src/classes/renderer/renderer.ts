import { WebGL1Renderer } from 'three';

export class Renderer extends WebGL1Renderer {
    constructor() {
        super();
        this.setSize(window.innerWidth, window.innerHeight);
    }
}
