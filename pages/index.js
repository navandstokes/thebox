import { Fragment } from 'react'
import Head from 'next/head'
import api from 'api'
import { Section } from 'components/Section'
import { Navbar } from 'components/Navbar'

const HomePage = ({ page }) => {
	const menu = [
	      {title: 'Tech', slug: 'tech'},
	      {title: 'Living', slug: 'living'},
	      {title: 'Travel', slug: 'travel'}
	    ]

	return (
		<Fragment>
			<Head>
				<title>The Box | Caravan Tiny Home Hybrid</title>
			</Head>
			<Navbar items={menu} />
			<div className="h3"></div>
			{ (typeof page.fields.banner != 'undefined') && 
			  <div className="dn db-ns h-50vw vh-100-ns w-100 absolute top-0 left-0" 
			        style={{ 
			          backgroundImage: 'url(' + page.fields.banner.fields.file.url + '?w=1366)',
			          backgroundSize: 'cover',
			          backgroundPosition: 'center center',
			          zIndex: '-1'
			        }} />
			}
			<div className="bg-magnolia pt6-ns min-vh-100 flex-l gutters flex-wrap">
			  { (typeof page.fields.sections != 'undefined') &&
			      page.fields.sections.map((item) => {
			      	return <Section {...item.fields} key={item.sys.id} />
			      })
			  }
			</div>
		</Fragment>
	)
}

export async function getStaticProps() {
	let page 

	await api.getEntries({
		'sys.id': `55s4UuuH3SkXmctxBha6o0`,
		include: `3`
	}).then(data => {
	  page = data.items[0]
	})

	return {
		props: { page },
		unstable_revalidate: 60
	}
}

export default HomePage