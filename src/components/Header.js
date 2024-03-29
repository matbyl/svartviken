import tw, { styled } from 'twin.macro'

export const Header = styled.div`
  ${tw`bg-cover bg-center`}
  min-height: 350px;
  background-color: black;
  overflow: hidden;
  background-image: ${props =>
    'linear-gradient(to bottom right,rgba(0,0,0,1),rgba(0,0,0,0.54)), url(' +
      props.backgroundImage +
      ')' || 'none'};
  display: flex;
`

export const HeaderContent = styled.div`
  ${tw`m-auto my-48 text-center`};
`

export const HeaderTitle = styled.h1`
  ${tw`text-white text-lg md:text-xl lg:text-3xl xl:text-6xl`};
`
