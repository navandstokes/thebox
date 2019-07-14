import { Block } from './Block'
import { Renderer } from './Renderer'

export const Section = props => {
	return (
		<div className='gutters' id={props.slug}>
			<div>
				<h4 className="ttu fw4 mb2 f5 silver">{props.title}</h4> 
				{ (typeof props.subtitle != 'undefined') && 
					<h1 className="mt0">{props.subtitle}</h1> 
				}
			</div>
			{ (typeof props.text != 'undefined') && 
				<Renderer content={props.text} />
			}
			{(typeof props.items != 'undefined') &&
				props.items.map((item) => {
					return <Block {...item.fields} key={item.sys.id} ns={props.ns} />
				})
			}
		</div>
	)
}