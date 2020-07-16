import { useState } from 'react'
import { Icon } from 'components/Icon'
import { Img } from 'components/Img'

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
						handleClick={() => {setItem(index)}}
					/>
				)
			})}
		</div>
		{ item && (
			<GalleryModalWrapper
				{...props.images[item].fields}
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
		<div></div>
	)
}