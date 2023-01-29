import { css } from '@emotion/react';

import { TK_Grey } from 'tokens/colors';

export const styles = {
    root: css({
        borderLeft: `1px solid ${TK_Grey[500]}`,
        borderBottom: `1px solid ${TK_Grey[500]}`,
        height: '100%',
        width: '100%',
    }),
};
