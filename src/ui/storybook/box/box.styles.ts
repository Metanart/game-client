import { useMemo } from 'react';

import { css } from '@emotion/react';

import { TK_Grey } from 'tokens/colors';
import { TK_Radius } from 'tokens/radius';

export const useStyles = ({
    height = 40,
    width = 40,
    backgroundColor = TK_Grey[200],
}: {
    height?: number;
    width?: number;
    backgroundColor?: string;
}) =>
    useMemo(
        () => ({
            root: css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                borderRadius: TK_Radius.xsm,
                width,
                height,
                backgroundColor,
            }),
        }),
        [],
    );
