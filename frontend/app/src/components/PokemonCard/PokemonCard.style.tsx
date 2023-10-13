import { css } from '@mui/system';

import { styled } from 'theme';

export const Wrapper = styled('div')(
  () => css`
    margin: 0.5rem;
    width: 15.5rem;
    height: 11rem;
    border: 5px black double;
    font-family: Pokemon, sans-serif;
    text-align: center;
    padding: 1rem;
  `,
);
