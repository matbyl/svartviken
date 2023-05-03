import ReactMarkdown from 'react-markdown'
import tw, { styled } from 'twin.macro'
import richText, { trimmedRichText } from './RichText'

export const Description = styled.div`
  ${tw`text-base max-w-prose`}

  p {
    margin: 15px 0;
  }
`

export const CardDescription = styled.div`
  ${tw`text-black text-base`}
`

export const ContLink = styled.a`
  ${tw`text-gray-500`}
`

export const CardContLink = styled.a`
  ${tw`text-gray-500`}
`

export const MarkdownDescription = ({ description }) =>
  description ? (
    <Description className="text-white m-auto">
      <ReactMarkdown children={description.description} />
    </Description>
  ) : null

export const RichTextDescription = ({ description, white = false }) =>
  description ? (
    <Description className={white ? 'text-white' : 'text-black'}>
      {richText(JSON.parse(description.raw), new Map(description.references))}
    </Description>
  ) : null

export const TrimmedRichTextDescription = ({ description, readMore }) =>
  description ? (
    <Description>
      {trimmedRichText(
        JSON.parse(description.raw),
        new Map(description.references),
        30
      )}
    </Description>
  ) : null

export const TrimmedRichTextCardDescription = ({ description }) =>
  description ? (
    <CardDescription>
      {trimmedRichText(
        JSON.parse(description.raw),
        new Map(description.references),
        30
      )}
    </CardDescription>
  ) : null
