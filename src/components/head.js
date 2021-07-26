import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const Head = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }

        discordInvite: contentfulSocialMediaLink(name: {eq: "Discord invite"}) {
          lnkinfo { link }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? title : defaultTitle}
      titleTemplate={(title && defaultTitle) ? `%s | ${defaultTitle}` : defaultTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

Head.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

Head.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Head
