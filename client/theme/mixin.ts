import { css } from 'styled-components';

export const flexLayout = (direction = 'column', alignItems = 'center', justifyContent = 'center') => css`
    display: flex;
    direction: ${direction};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
`;
