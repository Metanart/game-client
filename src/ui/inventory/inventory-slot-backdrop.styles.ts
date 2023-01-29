import { css } from '@emotion/react';

import { TK_Colors } from 'tokens/colors';
import { TK_Radius } from 'tokens/radius';

export const styles = {
    root: css({
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: TK_Colors.Bouncy,
        borderRadius: TK_Radius.xsm,
        opacity: 0.3,
    }),
};
