import React from 'react'
import Link from 'next/link'
import api from '../api'
import Head from 'next/head'
import { Section } from '../components/Section'

class HomePage extends React.Component {
	static async getInitialProps() {
	  let page = {'fields': ''}

	  await api.getEntries({
	  	'sys.id': `55s4UuuH3SkXmctxBha6o0`,
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
				  { (typeof page.fields.sections != 'undefined') &&
				      page.fields.sections.map((item) => {
				      	return <Section {...item.fields} key={item.sys.id}/>
				      })
				  }
				</div>
			</div>
		);
	}
}

export default HomePage;