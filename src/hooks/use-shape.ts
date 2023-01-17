import { Shape, ShapeOptions } from 'cannon-es';

export function useShape(options: ShapeOptions) {
    return new Shape(options);
}
