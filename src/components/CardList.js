import tw, { styled } from 'twin.macro'

export const CardList = styled.div`
  ${tw`flex flex-row flex-wrap gap-8 w-full lg:p-10 md:pr-2 justify-center`}
`

const CardBox = styled.div`
  ${tw`md:shadow-xl bg-white rounded p-4`}

  width: 700px;
  min-width: 700px;
`

const CardContent = styled.div`
  ${tw`w-full my-4 md:my-0 md:p-8 max-w-2xl`}
`

export const Card = ({ title, image, children }) => (
  <CardBox>
    <CardContent>
      <h1 className="block text-xl mb-8 w-full text-center md:text-left">
        {title}
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="w-64 m-auto md:flex-1 md:mr-8">
          <img src={image} />
        </div>
        <div className="flex-1 mt-4 md:mt-0">{children}</div>
      </div>
    </CardContent>
  </CardBox>
)
