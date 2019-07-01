import { useState } from 'react'
import Link from 'next/link'
import { Renderer } from './Renderer'

export const Block = props => {
	// TODO write image gallery code
	return (
		<div className='pb4' id={props.slug}>
			<div>
				<h4 className="ttu fw4 mb2 f6 silver">{props.title}</h4> 
				{ (typeof props.subtitle != 'undefined') && 
					<h2 className="f3 mt0 gray">{props.subtitle}</h2> 
				}
			</div>
			{ (typeof props.text != 'undefined') && 
				<Renderer content={props.text} />
			}
			{ (typeof props.images != 'undefined') &&
				<Gallery images={props.images} />
			}
		</div>
	)
}

const Gallery = props => {
	let GalleryEl = props.images.map(item => {
		return (
			<div className="dib w-70 mr3">
				<GalleryImage {...item} />
			</div>
		)
	})
	return (
		<div className="w-100 overflow-x-scroll"
			style={{
				whiteSpace: 'nowrap'
			}}>
			{GalleryEl}
		</div>
	)
}

const GalleryImage = props => {
	const [active, toggleActive] = useState(false)

	return (
		<div className={active ? "fixed w-100 vh-100 top-0 left-0 z-999" : "h-75vw w-100 relative"}>
		<style jsx>{`
			.modal::before {
				content: "";
				display: ${active ? 'block' : 'none'};
				position: absolute;
				left: 0;
				top: -23%;
				width: 100%;
				height: 25%;
				background: black;
				background: linear-gradient(to top, rgba(0,0,0,1)25%, rgba(0,0,0,0)100%);
			}
		`}</style>
			<a className="absolute top-0 left-0 w-100 h-100" 
				onClick={(e) => {e.preventDefault(); toggleActive(!active)}}></a>
			<img src={props.fields.file.url} alt="" className={"object " + (active ? "h-50" : "h-100 br4")} />
			{ active &&
				<div className="modal bg-black h-50 pa4 relative">
					<h2 className="ma0">{props.fields.title}</h2>
					<p>{props.fields.description}</p>
				</div>
			}
		</div>
	)
}