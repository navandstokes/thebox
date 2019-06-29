import Link from 'next/link'
import { Renderer } from './Renderer'

export const Block = props => {
	let css = 'gutters pb4 tc'
	return (
		<div className={css}>
			<Step {...props} />
		</div>
	)
}

const Step = props => {
	return (
		<React.Fragment>
			<div className="mh4">
				{ (typeof props.subTitle != 'undefined') && 
					<h4 className="ttu fw4 mb2 f5 silver">{props.subTitle}</h4> 
				}
				<h2 className="mt0">{props.title}</h2> 
			</div>
			{ (typeof props.image != 'undefined') &&
				<img src={props.image.fields.file.url} alt={props.image.fields.description} />
			}
			{ (typeof props.text != 'undefined') && 
				<Renderer content={props.text} />
			}
		</React.Fragment>
	)
}