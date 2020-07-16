import { Block } from 'components/Block'
import { Renderer } from 'components/Renderer'

export const Section = props => {
	return (
		<>
			<div className="w-100-l pr7-l" id={props.slug}>
				<h1 className="ttu fw4 mb2 f5 silver" style={{letterSpacing: '0.05em'}}>{props.title}</h1> 
				{ (typeof props.subtitle != 'undefined') && 
					<span className="f2 fw6 mt0">{props.subtitle}</span> 
				}
				{ (typeof props.text != 'undefined') && 
					<Renderer content={props.text} />
				}
			</div>
			<div className="flex flex-wrap mb5 mb6-ns">
				{(typeof props.items != 'undefined') &&
					props.items.map((item, index) => {
						return <Block {...item.fields} key={item.sys.id} />
					})
				}				
			</div>
		</>
	)
}