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
		    )}
		} 
	}
	return (
		<div>
		{documentToReactComponents(props.content, options)}
		</div>
	)
}