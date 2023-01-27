import { useMemo } from 'react';

import { css } from '@emotion/react';

import { TK_Grey } from 'tokens/colors';
import { TK_Radius } from 'tokens/radius';
import { TK_Spacing } from 'tokens/spacing';

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
                padding: TK_Spacing.md,
                borderRadius: TK_Radius.sm,
                width,
                height,
                backgroundColor,
                border: hasBorder ? `1px solid ${TK_Grey[300]}` : undefined,
            }),
        }),
        [height, width, backgroundColor, hasBorder],
    );
