import { useState } from 'react'
import { Transition } from 'react-spring/renderprops.cjs'
import { Icon } from './Icon'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import Img from './Img'

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

	const imageWidth = props.ns ? "calc(25% - 0.5rem)" : "calc(33.33% - 0.5rem)"

	return (
		<React.Fragment>
			<div className={"mr2 mb2 " + (!active ? "dim" : "")} id="galleryImage"
				style={{
					width: imageWidth
				}}>
				<a className="pointer" onClick={(e) => {handleClick(e)}}>

					<Img src={props.file.url} width={120} height={120} fit="fill" />
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
			<a className="dn db-l absolute top-0 left-0 w-100 h-100 pointer z-9999"
				onClick={(e) => {props.handleClick(e)}}>
			</a>
			<div className="bg-white relative"
				style={{
					display: active ? 'block' : 'none',
					width: props.ns ? '935px' : '100%',
					height: props.ns ? '600px' : '100vh'
				}}>
				<a className="absolute top-0 left-0 w-100 h-100 pointer z-9999"
					onClick={(e) => {props.handleClick(e)}}>
					{ !props.ns &&
						<div className="bg-blue white br-100 dib h2 w2 flex justify-center items-center ma3">
							<Icon icon="ArrowLeftIcon" size="1.5em" />
						</div>
					}
				</a>
				<div width="600" style={{minHeight: '50vh'}}>
					<Img src={props.file.url} />
				</div>
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