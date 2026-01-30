'use client'

import styled, { css } from 'styled-components'
import { scaleMediaStyles } from '~/utils/styles'

export const MenuStyled = styled.div<{ $mobileWidth?: number }>`
  ${({ $mobileWidth }) =>
    scaleMediaStyles($mobileWidth, {
      base: css`
      .side-right::-webkit-scrollbar {
  width: 6px;
}

.side-right::-webkit-scrollbar-track {
  background: transparent;
}

.side-right::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.side-right::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.35);
}

      `,
      landscape: css``,
      portrait: css``,
    })}
`
