/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled, { css } from 'styled-components'

export interface ListProps {
  horizontal?: boolean;
  children: any;
  className: any;
}

const List = styled.ul<ListProps>`
  margin: 0;
  padding: 0;
  list-style: none;

  ${(props) =>
    props.horizontal &&
    css`
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    `}
`

export const UiList: React.FC<ListProps> = (props) => {
  return (
    <List {...props} >
      {props.children.map((child:any, index:any) => (
        <li key={index}>{child}</li>
      ))}
    </List>
  )
}
