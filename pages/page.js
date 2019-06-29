import React from 'react'
import Link from 'next/link'
import api from '../api'
import Head from 'next/head'
import { Block } from '../components/Block'
import { AccordionBlock } from '../components/Accordion'

class Page extends React.Component {
  static async getInitialProps({ query: { slug }, res }) {
    let post = {}

    await api.getEntries({
      content_type: `page`,
      'fields.slug': `${slug}`,
      include: `3`
    })
    .then(data => {
      post = data.items[0]
    })

    if (post) {
      return { post }
    }
  
    if (res) {
      res.statusCode = 404
    }
    return { error: true }
  }

  render() {
    if (this.props.error) {
      return <div>Page not found</div>
    }
    const { post } = this.props

    return (
      <div>
        <Head>
          <title>{post.fields.title} | Vogue Dental Studios</title>
        </Head>
          { (typeof post.fields.banner != 'undefined') && 
            <div className="h-50vw vh-100-ns w-100" 
                  style={{ 
                    backgroundImage: 'url(' + post.fields.banner.fields.file.url + ')',
                    backgroundSize: 'cover',
                    zIndex: '-1'
                  }} />
          }
          <div>
          { (typeof post.fields.blocks != 'undefined') &&
              post.fields.blocks.map((item) => {
                if (item.sys.contentType.sys.id == 'pageBlock') {
                  return <Block {...item.fields} key={item.sys.id} />
                } else if (item.sys.contentType.sys.id == 'pageAccordion') {
                  return <AccordionBlock {...item.fields} key={item.sys.id} />
                }
              })
          }
          </div>
      </div>
    );
  }
}

export default Page;