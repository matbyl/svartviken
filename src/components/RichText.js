import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Link } from 'gatsby'
import { ExternalLink, InternalLink } from '../components/Link'
import { INLINES, BLOCKS } from '@contentful/rich-text-types'
import { campaignUrl, episodeUrl, oneshotUrl } from '../utils/urls'

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
              <InternalLink to={campaignUrl(reference.id)}>
                {children}
              </InternalLink>
            )
          case 'ContentfulEpisode':
            return (
              <InternalLink to={episodeUrl(reference.id)}>
                {children}
              </InternalLink>
            )
          case 'ContentfulOneshot':
            return (
              <InternalLink to={oneshotUrl(reference.id)}>
                {children}
              </InternalLink>
            )
          default:
            return <span>{children}</span>
        }
      }
    },
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc my-4">{children}</ul>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
  },
})

export const richText = (document, references) =>
  documentToReactComponents(document, options(references))

export const trimmedRichText = (
  document,
  references,
  min = 30,
  endWhenTrimmed = null
) => {
  const trimNodes = ({ wordCount, nodes, trimmed }, currNode) => {
    if (wordCount < min) {
      if (currNode.value !== undefined) {
        const words = currNode.value.split(' ')
        const shouldTrim = words.length + wordCount > min
        // We know that the wordCount is less than min so the difference should how much we trim the current value
        const trimBy = min - wordCount;
        currNode.value = shouldTrim
          ? words.slice(0, trimBy).join(' ') + '...'
          : words.join(' ')
        nodes.push(currNode)
        wordCount = wordCount + words.length
        return { wordCount, nodes, trimmed: shouldTrim }
      } else if (currNode.content) {
        const trimmedCurrNode = currNode.content.reduce(trimNodes, {
          wordCount: wordCount,
          nodes: [],
          trimmed: trimmed,
        })
        currNode.content = trimmedCurrNode.nodes
        if (currNode.content.length > 0) nodes.push(currNode)
        return {
          wordCount: wordCount + trimmedCurrNode.wordCount,
          nodes,
          trimmed: true,
        }
      } else {
        console.log(
          'trimmedRichText does not support this node type yet: ',
          currNode
        )
        return { wordCount, nodes, trimmed }
      }
    } else {
      return { wordCount, nodes, trimmed }
    }
  }
  const { nodes, trimmed } = document.content.reduce(trimNodes, {
    wordCount: 0,
    nodes: [],
    trimmed: false,
  })
  document.content = nodes
  return (
    <div>
      {documentToReactComponents(document, options(references))}{' '}
      {trimmed ? endWhenTrimmed : null}{' '}
    </div>
  )
}

export default richText
