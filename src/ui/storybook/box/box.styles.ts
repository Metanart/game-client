import { useMemo } from 'react';

import { css } from '@emotion/react';

import { TK_Grey } from 'tokens/colors';
import { TK_Radius } from 'tokens/radius';

type T_Options = {
    height?: number | string;
    width?: number | string;
    backgroundColor?: string;
    hasBorder?: boolean;
};

export const useStyles = ({
    height,
    width,
    backgroundColor,
    hasBorder,
}: T_Options) =>
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
                border: hasBorder ? `1px solid ${TK_Grey[300]}` : undefined,
            }),
        }),
        [height, width, backgroundColor, hasBorder],
    );
