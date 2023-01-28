import { useMemo } from 'react';

import { css } from '@emotion/react';

export const styles = {
    root: css({
        width: '100%',
        position: 'relative',
    }),
    grid: css({
        zIndex: 1,
    }),
    slots: css({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 2,
    }),
};
