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
				<img src={item.fields.file.url} alt="" className="br4" />
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