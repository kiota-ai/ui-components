import styled, { css } from 'styled-components'

interface ContainerProps {
  $variant?: 'session' | 'center';
}

export const Container = styled.div<ContainerProps>`
  margin: 0 auto;

  ${(props) =>
    props.$variant === 'session' &&
    css`
      min-height: 100vh;
      width: 100vw;
      display: flex;
      padding: 0rem;

      > * {
        width: 100%;
        @media screen (min-width: 780px) {
          width: 50%;
        }
      }
    `};

    ${(props) =>
    props.$variant === 'center' &&
    css`
        height: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
`
