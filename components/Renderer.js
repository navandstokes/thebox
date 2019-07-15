import Link from 'next/link'
import { INLINES, BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Img from './Img'

export const Renderer = props => {
	const options = {
		renderNode: {
		    [BLOCKS.EMBEDDED_ASSET]: (node) => {
		    	return <Img src={node.data.target.fields.file.url} width={300} height={240} />
		    }
		} 
	}
	return (
		<div>
		{documentToReactComponents(props.content, options)}
		</div>
	)
}