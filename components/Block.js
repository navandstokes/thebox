import Link from 'next/link'
import { Renderer } from './Renderer'

export const Block = props => {
	let Inner = ''
	let css = 'gutters pb4 tc'
	switch(props.layout) {
		case 'standard':
		Inner = <Standard {...props} />
		break
		case 'step':
		Inner = <Step {...props} />
		break
		case 'block':
		Inner = <LayoutBlock {...props} />
		break
		case 'full':
		Inner = <Full {...props} />
		css = 'pb4 bg-near-white'
		break
		default:
		Inner = <Standard {...props} />
	}
	return (
		<div className={css}>
			{Inner}
		</div>
	)
}

const Standard = props => {
	return (
		<React.Fragment>
			<h1>{props.title}</h1> 
			{ (typeof props.subTitle != 'undefined') && 
				<h4>{props.subTitle}</h4> 
			}
			{ (typeof props.text != 'undefined') && 
				<Renderer content={props.text} />
			}
		</React.Fragment>
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

const LayoutBlock = props => {
	return (
		<div className="bg-near-white pa3 br3">
			{ (typeof props.subTitle != 'undefined') && 
				<h4>{props.subTitle}</h4> 
			}
			<h3>{props.title}</h3> 
			{ (typeof props.text != 'undefined') && 
				<Renderer content={props.text} />
			}
		</div>
	)
}

const Full = props => {
	return (
		<React.Fragment>
			{ (typeof props.image != 'undefined') &&
				<img src={props.image.fields.file.url} alt={props.image.fields.description} />
			}
			<div className="gutters pv2">
				<h2>{props.title}</h2> 
				{ (typeof props.subTitle != 'undefined') && 
					<h4>{props.subTitle}</h4> 
				}
				{ (typeof props.text != 'undefined') && 
					<Renderer content={props.text} />
				}
			</div>
		</React.Fragment>
	)
}