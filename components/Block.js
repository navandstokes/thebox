import { useState } from 'react'
import Link from 'next/link'
import { Renderer } from './Renderer'
import { Gallery } from './Gallery'

export const Block = props => {
	const hasImages = typeof props.images != 'undefined'
	return (
		<div className={"pb4 flex flex-column flex-row-l " + (hasImages ? "" : "block")} id={props.slug}
			style={{
				width: (hasImages || !props.ns) ? '100%' : 'calc(33.33% - 1rem)',
				backgroundColor: hasImages ? 'white' : '#f4f4f4',
				borderRadius: hasImages ? '0px' : '1rem',
				margin: hasImages ? '0px' : '1rem',
				padding: hasImages ? '0px' : '1rem',
				marginLeft: props.first ? '0px' : ''
			}}
		>
		<style jsx>{`
			div + .block {
				margin-left: 0px !important
			}
			.block:first-of-type {
				margin-left: 0px !important
			}
		`}</style>
			<div className={hasImages ? "w-40-l" : ""}>
				<h4 className="ttu fw4 mb2 f6 silver">{props.title}</h4> 
				{ (typeof props.subtitle != 'undefined') && 
					<h2 className="f3 mt0 gray">{props.subtitle}</h2> 
				}
				{ (typeof props.text != 'undefined') && 
					<Renderer content={props.text} />
				}
			</div>
			{ (typeof props.images != 'undefined') &&
				<div className="pl6-l pt5-l mt4-l w-60-l">
					<Gallery images={props.images} ns={props.ns} />
				</div>
			}
		</div>
	)
}