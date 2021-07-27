import tw, { styled } from 'twin.macro'

const SocialIcon = styled.img`
        ${tw`inline-block`};

        opacity: 0.82;
        cursor: pointer;
        :hover {
        opacity: 1;
        }
        width: 20px;
        margin: auto 5px;
    `

const socialMediaIcon = (icon, url, alt) => (
    <a className="px-1" href={url} target="_blank">
        <SocialIcon src={icon} alt={alt} width="20" height="20" />
    </a>
)

export { SocialIcon, socialMediaIcon }