import { Length } from 'tokens/measurements';

export const playerConfig = {
    dimensions: {
        width: Length.Decimeter * 5,
        height: Length.Decimeter * 15,
        depth: Length.Decimeter * 7,
    },

    speed: {
        walk: 2,
        run: 4,
        turn: 0.1,
    },
};
