import ReactMarkdown from "react-markdown";
import tw, { styled } from 'twin.macro'
import richText, { trimmedRichText } from "./RichText";

export const Description = styled.div`
    ${tw`text-white text-base xl:text-xl max-w-prose m-auto px-4`}
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

export const MarkdownDescription = ({ description }) => (
    description ? (
        <Description>
            <ReactMarkdown children={description.description} />
        </Description>
    ) : null
)

export const RichTextDescription = ({ description }) => (
    description ? (
        <Description>{
            richText(
                JSON.parse(description.raw),
                new Map(description.references)
            )
        }
        </Description>
    ) : null
)

export const TrimmedRichTextDescription = ({ description, readMore }) => (
    description ? (
        <Description>
            {trimmedRichText(
                JSON.parse(description.raw),
                new Map(description.references),
                30,
                <ContLink href={readMore}>Forts.</ContLink>
            )}
        </Description>
    ) : null
)

export const TrimmedRichTextCardDescription = ({ description, readMore }) => (
    description ? (
        <CardDescription>
            {trimmedRichText(
                JSON.parse(description.raw),
                new Map(description.references),
                30,
                <CardContLink href={readMore}>Forts.</CardContLink>
            )}
        </CardDescription>
    ) : null
)