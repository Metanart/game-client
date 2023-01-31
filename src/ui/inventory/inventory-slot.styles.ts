import { css } from '@emotion/react';

import { TK_Grey } from 'tokens/colors';
import { TK_Radius } from 'tokens/radius';

export const styles = {
    root: css({
        cursor: 'move',
        position: 'absolute',
        backgroundColor: TK_Grey[400],
        borderRadius: TK_Radius.xsm,
    }),
};
