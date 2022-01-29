import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Link } from 'gatsby'
import { ExternalLink, InternalLink } from '../components/Link'
import { INLINES, BLOCKS } from '@contentful/rich-text-types'

const options = references => ({
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: ({ data }, children) => {
      if (data.uri) {
        return <ExternalLink href={data.uri}>{children}</ExternalLink>
      } else {
        const reference = references.get(data.target.sys.id) || {
          type: 'undefined',
        }
        switch (reference.type) {
          case 'ContentfulCampaign':
            return (
              <InternalLink to={'/campaigns/' + reference.id}>
                {children}
              </InternalLink>
            )
          case 'ContentfulEpisode':
            return (
              <InternalLink to={'/episodes/' + reference.id}>
                {children}
              </InternalLink>
            )
          case 'ContentfulOneshot':
            return (
              <InternalLink to={'/oneshots/' + reference.id}>
                {children}
              </InternalLink>
            )
          default:
            return <span>{children}</span>
        }
      }
    },
    [BLOCKS.UL_LIST]: (node, children) => (<ul className="list-disc my-4">{children}</ul>),
    [BLOCKS.LIST_ITEM]: (node,children) => (<li>{children}</li>) 
  },
})

const richText = (document, references) =>
  documentToReactComponents(document, options(references))

export default richText
