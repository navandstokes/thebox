import { Icon } from './Icon'

export const Circle = props => {
	return (
		<div className="w3 h3 br-100 bg-dark-pink fixed bottom-2 right-2"
			style={{boxShadow: ' 0px 7px 19px -12px rgb(0,0,0,1)'}}>
			<a href="tel:+642041805803" className="db w-100 h-100 flex justify-center items-center">
				<Icon icon="PhoneIcon" size="2rem" className="white" /> 
			</a>
		</div>
	)
}