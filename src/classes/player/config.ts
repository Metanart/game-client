import { Length } from 'tokens/measurements';

export const playerConfig = {
    dimensions: {
        width: Length.Decimeter * 5,
        height: Length.Decimeter * 15,
        depth: Length.Decimeter * 7,
    },

    walk: {
        velocity: Length.Meter * 2,
    },
};
