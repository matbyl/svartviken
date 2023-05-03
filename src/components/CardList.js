import tw, { styled } from 'twin.macro'

export const CardList = styled.div`
  ${tw`flex flex-row flex-wrap gap-8 w-full lg:p-10 md:pr-2 justify-center`}
`

const CardBox = styled.div`
  ${tw`md:shadow-xl md:w-10/12 lg:w-5/12 bg-white rounded p-4`}
`

const CardContent = styled.div`
  ${tw`w-full h-full flex flex-col my-4 md:my-0 md:p-8 max-w-2xl`}
`

export const Card = ({ title, image, children }) => (
  <CardBox>
    <CardContent className="m-auto">
      <img src={image} className="h-48 mb-8 mx-auto" />
      <h1 className="block text-xl w-full text-center mt-8 mb-4">{title}</h1>
      <div className="flex flex-col flex-1 mt-4 md:mt-0">{children}</div>
    </CardContent>
  </CardBox>
)
