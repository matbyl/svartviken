import tw, { styled } from 'twin.macro'

const LinkButton = styled.a`
  ${tw`inline-block bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded hover:no-underline`};
`

const WhiteLinkButton = styled.a`
${tw`inline-block bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded hover:no-underline`};
`

export { WhiteLinkButton, LinkButton }
