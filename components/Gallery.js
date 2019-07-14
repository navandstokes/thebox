import { useState } from 'react'
import { Transition } from 'react-spring/renderprops'
import { Icon } from './Icon'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export const Gallery = props => {
	let GalleryEl = props.images.map(item => {
		return (
			<GalleryImage {...item.fields} ns={props.ns} key={item.sys.id} />
		)
	})
	return(
		<div className="w-100 flex flex-row flex-wrap">
			{GalleryEl}
		</div>
	)
}

const GalleryImage = props => {
	const [active, toggleActive] = useState(false)

	function handleClick(e) {
		e.preventDefault()
		if (active) {
			clearAllBodyScrollLocks()
		} else {
			disableBodyScroll(document.querySelector('#galleryImage'), {
			    reserveScrollBarGap: true
			})
		}
		toggleActive(!active)
	}

	const imageWidth = props.ns ? "15vw" : "calc(33% - 0.5rem)"

	return (
		<React.Fragment>
			<div className={"mr2 mb2 " + (!active ? "dim" : "")} id="galleryImage"
				style={{
					width: "calc(33.33% - 0.5rem)"
				}}>
				<a className="pointer" onClick={(e) => {handleClick(e)}}>
					<img src={props.file.url + "?fit=fill&w=360&h=360"} 
						className="object w-100 h-100" />
				</a>
				{active &&
					<GalleryModal {...props} active={active} handleClick={handleClick} />
				}
			</div>
		</React.Fragment>
	)
}

const GalleryModal = props => {
	const active = props.active
	return (
		<div className="fixed top-0 left-0 z-9999 w-100 vh-100 justify-center items-center" 
			style={{
				display: active ? (props.ns ? 'flex' : 'block') : 'none',
				background: props.ns ? 'rgba(0,0,0,0.5)' : ''
			}}>
			<a className="dn db-l absolute top-0 left-0 w-100 h-100 pointer"
				onClick={(e) => {props.handleClick(e)}}>
			</a>
			<div className="bg-white relative"
				style={{
					display: active ? 'block' : 'none',
					width: props.ns ? '935px' : '100%',
					height: props.ns ? '600px' : '100vh'
				}}>
				<a className="absolute top-0 left-0 w-100 h-100 pointer pt4 pl4"
					onClick={(e) => {props.handleClick(e)}}>
					{ !props.ns &&
						<Icon icon="ArrowLeftIcon" size="1.5rem" className="ma1" />
					}
				</a>
				<img src={props.file.url + "?fit=fill&w=600&h=600"} 
					className="object" width={props.ns ? "600" : "100%"} />
				<Transition
					items={active}
					unique={true}
					from={{opacity: 0}}
					enter={{opacity: 1}}
					leave={{opacity: 0}}
					immediate={!active}
				>
				{ active => active && (styles => {return (
					<div className="absolute-l right-0-l top-0-l pa4" 
					style={styles, {width: props.ns ? '335px' : '100%'}}
					>
					<a className="dn db-l absolute pointer w2 h2 white" style={{top: '-2.5rem', right: 0}}
						onClick={(e) => {props.handleClick(e)}}>
						<Icon icon="XIcon" size="1.5rem" className="ma1" />
					</a>
							<h2 className="ma0">{props.title}</h2>
							<p>{props.description}</p>
					</div>
				)})}
				</Transition>
			</div>
		</div>
	)
}