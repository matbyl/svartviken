import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'

export const ExternalLink = styled.a`
  ${tw`text-blue-500`}
`
export const InternalLink = styled(Link)`
  ${tw`text-blue-500`}
`
