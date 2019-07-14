import { useState } from 'react'
import Link from 'next/link'
import { Renderer } from './Renderer'
import { Gallery } from './Gallery'

export const Block = props => {
	// TODO write image gallery code
	return (
		<div className="pb4 flex flex-column flex-row-l" id={props.slug}>
			<div>
				<h4 className="ttu fw4 mb2 f6 silver">{props.title}</h4> 
				{ (typeof props.subtitle != 'undefined') && 
					<h2 className="f3 mt0 gray">{props.subtitle}</h2> 
				}
				{ (typeof props.text != 'undefined') && 
					<Renderer content={props.text} />
				}
			</div>
			<div>
				{ (typeof props.images != 'undefined') &&
					<Gallery images={props.images} ns={props.ns} />
				}
			</div>
		</div>
	)
}