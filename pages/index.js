import React from 'react'
import Link from 'next/link'
import api from '../api'
import Head from 'next/head'
import { Section } from '../components/Section'
import { Player, BigPlayButton, LoadingSpinner } from 'video-react'
import '../node_modules/video-react/dist/video-react.css'

class HomePage extends React.Component {
	static async getInitialProps() {
	  let page = {'fields': ''}

	  await api.getEntries({
	  	'sys.id': `55s4UuuH3SkXmctxBha6o0`,
	  	include: `3`
	  }).then(data => {
	    page = data.items[0]
	  })

	  let video = await api.getAsset(`1Nyn64W8jQ96Q3Oj9Pl6Gl`)
	  let videoCover = await api.getAsset(`4ORaFBceeLiPuGPg8vQN0x`)

	  if (page) {
	    return { page, video, videoCover }
	  }
	}

	render() {
		const { page, video, videoCover } = this.props

		return (
			<div>
				<Head>
					<title>The Box | Caravan Tiny Home Hybrid</title>
				</Head>
				{ (typeof page.fields.banner != 'undefined') && 
				  <div className="dn db-ns h-50vw vh-100-ns w-100 absolute top-0 left-0" 
				        style={{ 
				          backgroundImage: 'url(' + page.fields.banner.fields.file.url + '?w=1366)',
				          backgroundSize: 'cover',
				          backgroundPosition: 'center center',
				          zIndex: '-1'
				        }} />
				}
				{ (typeof video.fields.file.url != 'undefined') &&
				<div className="w-100 flex-ns justify-center items-center">
					<div className="w-100 w-25-ns">
						<Player poster={videoCover.fields.file.url}>
							<source src={video.fields.file.url} />
							<BigPlayButton position="center" />
							<LoadingSpinner />
						</Player>
					</div>
				</div>
				}
				<div className="bg-magnolia pt6-ns min-vh-100 flex-l gutters flex-wrap">
				  { (typeof page.fields.sections != 'undefined') &&
				      page.fields.sections.map((item) => {
				      	return <Section {...item.fields} key={item.sys.id} ns={this.props.ns} />
				      })
				  }
				</div>
			</div>
		);
	}
}

export default HomePage;