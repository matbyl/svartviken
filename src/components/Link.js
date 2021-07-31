import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'

const linkStyle = component => styled(component)`
  ${tw`text-blue-500`}
`

export const ExternalLink = linkStyle(styled.a)
export const InternalLink = linkStyle(Link)
