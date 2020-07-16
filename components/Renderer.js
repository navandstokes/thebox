import Link from 'next/link'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Img } from 'components/Img'

export const Renderer = props => {
	const options = {
		renderNode: {
		    [BLOCKS.EMBEDDED_ASSET]: (node) => {
		    	return (
		    		<div style={{width: 300, height: 240}}>
			    		<Img 
				    		file={node.data.target.fields.file} 
				    		ratio={node.data.target.fields.file.details.image.height/node.data.target.fields.file.details.image.width}
				    		className="w-100 h-100 object"
				    	/>
		    		</div>
		    )},
		    [INLINES.HYPERLINK]: (node) => {
		    	return (
		    		<Squiggle href={node.data.target}>
			    		{node.content[0].value}
		    		</Squiggle>
	    		)
		    }
		} 
	}
	return (
		<div>
		{documentToReactComponents(props.content, options)}
		</div>
	)
}

const Squiggle = ({ children, href }) => {
	return (
		<>
		<style jsx>
			{`
				a {
					position: relative;
					z-index: 1;
					display: inline-flex;
					padding-left: .15rem;
					padding-bottom: .05rem;
					padding-right: .15rem;
					font-size: 0.9rem;
					font-weight: 600;
				}
				a::before {
					content: "";
					width: 100%;
					height: 100%;
					background-image: linear-gradient(to top, #fed330 30%, rgba(0, 0, 0, 0) 45%);
					position: absolute;
					left: 0;
					bottom: 0;
					z-index: -1;
					will-change: width;
					transform-origin: left bottom
				}
				a:hover::before {
					width: 50%;
				}
			`}
		</style>
		<a href={href}>{ children }</a>
		</>
	)
}