import { Icon } from './Icon'

export const Circle = props => {
	return (
		<div className="w3 h3 br-100 bg-dark-pink fixed bottom-2 right-2"
			style={{boxShadow: ' 0px 7px 19px -12px rgb(0,0,0,1)'}}>
			<a href="tel:+642041805803" className="db w-100 h-100 flex justify-center items-center" onClick={(e) => {ReactPixel.track('Contact')}}>
				<Icon icon="PhoneIcon" size="2rem" className="white" /> 
			</a>
		</div>
	)
}

export const Messenger = props => {
	return (
		<div className="w3 h3 br-100 bg-blue fixed right-2"
			style={{boxShadow: ' 0px 7px 19px -12px rgb(0,0,0,1)', bottom: '7rem'}}>
			<a href="https://m.me/ivan.biondi" className="db w-100 h-100 flex justify-center items-center" onClick={(e) => {ReactPixel.track('Contact')}}>
				<Icon icon="ChatIcon" size="2rem" className="white" /> 
			</a>
		</div>
	)
}