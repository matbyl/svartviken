import { useStaticQuery, graphql } from 'gatsby'

export const useSocialMediaLinks = () => {
    const data = useStaticQuery(
        graphql`
            query {
                discordInvite: contentfulSocialMediaLink(name: {eq: "Discord invite"}) {
                    lnkinfo { link }
                }
            }
        `
    )
    return {
        discordInviteUrl: data.discordInvite?.lnkinfo?.link
    }
}
