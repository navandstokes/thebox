import Link from 'next/link'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const Renderer = props => {
	const options = {
		renderNode: {
		    [BLOCKS.EMBEDDED_ASSET]: (node) => {
		    	return <img src={node.data.target.fields.file.url + "?w=260"} />
		    }
		} 
	}
	return (
		<div>
		{documentToReactComponents(props.content, options)}
		</div>
	)
}