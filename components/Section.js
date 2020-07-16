import { Block } from 'components/Block'
import { Renderer } from 'components/Renderer'

export const Section = props => {
	return (
		<>
			<div className="w-100-l pr7-l" id={props.slug}>
				<h4 className="ttu fw4 mb2 f5 silver">{props.title}</h4> 
				{ (typeof props.subtitle != 'undefined') && 
					<h1 className="mt0">{props.subtitle}</h1> 
				}
				{ (typeof props.text != 'undefined') && 
					<Renderer content={props.text} />
				}
			</div>
			{(typeof props.items != 'undefined') &&
				props.items.map((item, index) => {
					return <Block {...item.fields} key={item.sys.id} ns={props.ns} first={index == 0} />
				})
			}
		</>
	)
}