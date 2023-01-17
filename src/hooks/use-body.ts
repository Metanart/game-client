import { Body, BodyOptions } from 'cannon-es';

export function useBody(options: BodyOptions) {
    return new Body(options);
}
