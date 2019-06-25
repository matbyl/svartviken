import React from 'react'
import Layout from '../components/layout'

export default class AboutPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div style={{ color: `teal` }} />
      </Layout>
    )
  }
}

// export const pageQuery = graphql``
