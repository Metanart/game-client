import { useMemo } from 'react';

import { css } from '@emotion/react';

export const useStyles = () =>
    useMemo(
        () => ({
            root: css({
                width: '100%',
            }),
            grid: css({
                zIndex: 1,
            }),
            slots: css({
                zIndex: 2,
            }),
        }),
        [],
    );
