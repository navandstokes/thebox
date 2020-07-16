import { useState } from 'react'
import { Img } from 'components/Img'
import { RemoveScroll } from 'react-remove-scroll'
import styles from './Gallery.module.css'

export const Gallery = props => {
	const [item, setItem] = useState(false)

	return(
		<>
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(3,1fr)',
				gap: '1rem'
			}}
		>
			{ props.images.map((item, index) => {
				return (
					<GalleryImage 
						{...item.fields} 
						key={item.sys.id} 
						handleClick={() => {setItem(index + 1)}}
					/>
				)
			})}
		</div>
		{ item && (
			<GalleryModalWrapper
				{...props.images[item - 1].fields}
				removeModal={() => {setItem(false)}}
			/>
		)}
		</>
	)
}

const GalleryImage = props => {
	return (
		<div className="dim pointer" onClick={props.handleClick}>
			<Img 
				alt={props.title}
				file={props.file}
				ratio={1}
				className="w-100 h-100 object"
			/>			
		</div>
	)
}

const GalleryModalWrapper = props => {
	return (
		<RemoveScroll>
			<div className={styles.gridModalWrapper} id="galleryModal">
				<a className="dn db-l absolute top-0 left-0 w-100 h-100 pointer"
					onClick={props.removeModal}>
				</a>
				<div className={styles.gridModal}>
					<div className="dn-l flex justify-between">
						<a className="mv2 mh3 flex items-center" onClick={props.removeModal}>
							<div style={{ width: '8px', marginRight: '10px', display: "block" }}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477.175 477.175"><path fill="currentColor" d="M145.188 238.575l215.5-215.5c5.3-5.3 5.3-13.8 0-19.1s-13.8-5.3-19.1 0l-225.1 225.1c-5.3 5.3-5.3 13.8 0 19.1l225.1 225c2.6 2.6 6.1 4 9.5 4s6.9-1.3 9.5-4c5.3-5.3 5.3-13.8 0-19.1l-215.4-215.5z"/></svg>
							</div>
							<h4 className="ma0 f7 fw5 ttu">Go Back</h4>
						</a>
					</div>
					<GalleryInner {...props} />
				</div>
			</div>
		</RemoveScroll>
	)
}

const GalleryInner = props => {
	return (
		<>
			<div className={styles.modalImage}>
				<div className="absolute top-0 left-0 w-100" style={{cursor: 'auto'}}>
					<Img
						file={props.file}
						alt={props.description}
						ratio={1}
					/>
				</div>
			</div>
			<div className={styles.modalDetails + " bg-magnolia pa3 pt2 pa4-l pb2-l flex-l flex-column justify-between"} >
				<a className="dn db-l absolute pointer w2 h2 white" style={{top: '-1.5rem', right: 0}}
					onClick={props.removeModal}>
					<svg style={{position: 'absolute', left: 0, top: 0}} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</a>
				<div className="flex flex-row flex-column-l flex-wrap justify-between">
					<h3 className="fw5">{props.title}</h3>
					<p>{props.description}</p>
				</div>
			</div>
		</>
	)
}