import React from 'react'
import Link from 'next/link'
import api from '../api'
import Head from 'next/head'
import { Block } from '../components/Block'
import { AccordionBlock } from '../components/Accordion'

class HomePage extends React.Component {
	static async getInitialProps({ query: { slug }, res }) {
	  let page = {'fields': ''}

	  await api.getEntries({
	  	'sys.id': `73GYEM1cdaCAzAvAHCkRi6`,
	  	include: `3`
	  }).then(data => {
	    page = data.items[0]
	  })

	  if (page) {
	    return { page }
	  }
	}

	render() {
		const { page } = this.props

		return (
			<div>
				<Head>
					<title>Clear Braces Centre | Vogue Dental Studios</title>
				</Head>
				{ (typeof page.fields.banner != 'undefined') && 
				  <div className="h-50vw vh-100-ns w-100" 
				        style={{ 
				          backgroundImage: 'url(' + page.fields.banner.fields.file.url + ')',
				          backgroundSize: 'cover',
				          zIndex: '-1'
				        }} />
				}
				<div className="bg-magnolia pt6-ns min-vh-100">
				  { (typeof page.fields.blocks != 'undefined') &&
				      page.fields.blocks.map((item) => {
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

export default HomePage;