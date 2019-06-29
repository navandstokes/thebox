import Link from 'next/link'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const Renderer = props => {
	const options = {
		renderNode: {
		    '[INLINES.HYPERLINK]': node => {
		    	return <a href={node.data.uri}><span className="bg-blue white f4 pa2">{node.content[0].value}</span></a>
		    },
		    '[INLINES.ENTRY-HYPERLINK]': async (node, children) => {
		    	const reference = await resolveDependencies(node.data.target);
		    	return <Link href={'/page?slug=' + reference.fields.slug} passHref><a>{children}</a></Link>
		    }
		}
	}
	return (
		<div>
		{documentToReactComponents(props.content, options)}
		</div>
	)
}