import React from 'react'
import { Link } from 'gatsby'
import tw,  {styled} from 'twin.macro'

export const TitleLink = styled(Link)`
  font-family: 'Colus', Arial, Helvetica, sans-serif;
  font-size: 28px;

  :hover {
    text-decoration: underline;
  }
`
