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
		<>
			<Head>
				<title>The Box | Caravan Tiny Home Hybrid</title>
			</Head>
			<Navbar items={menu} />
			{ (typeof page.fields.banner != 'undefined') && 
			  <div className="vh-100-ns w-100 absolute-ns top-0 left-0" 
			        style={{ 
			          backgroundImage: 'url(' + page.fields.banner.fields.file.url + '?w=1366)',
			          backgroundSize: 'cover',
			          backgroundPosition: 'center center',
			          zIndex: '-1'
			        }} />
			}
			<div className="h6 dn db-ns" />
			<div className="mt7-ns min-vh-100 gutters pa5-ns">
			  { (typeof page.fields.sections != 'undefined') &&
			      page.fields.sections.map((item) => {
			      	return <Section {...item.fields} key={item.sys.id} />
			      })
			  }
			</div>
		</>
	)
}

export async function getStaticProps() {
	let page 

	await api.getEntries({
		'sys.id': `55s4UuuH3SkXmctxBha6o0`,
		include: `8`
	}).then(data => {
	  page = data.items[0]
	})

	return {
		props: { page },
		unstable_revalidate: 60
	}
}

export default HomePage