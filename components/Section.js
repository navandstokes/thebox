import { Block } from './Block'

export const Section = props => {
	return (
		<div>
			<div className="mh4">
				<h4 className="ttu fw4 mb2 f5 silver">{props.title}</h4> 
				{ (typeof props.subTitle != 'undefined') && 
					<h1 className="mt0">{props.subTitle}</h1> 
				}
			</div>
			{ (typeof props.text != 'undefined') && 
				<Renderer content={props.text} />
			}
			{(typeof props.items != 'undefined') &&
				props.items.map((item) => {
					return <Block {...item.fields} key={item.sys.id} />
				})
			}
		</div>
	)
}