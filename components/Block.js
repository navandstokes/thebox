import { useState } from 'react'
import Link from 'next/link'
import { Renderer } from 'components/Renderer'
import { Gallery } from 'components/Gallery'

export const Block = props => {
	const hasImages = typeof props.images != 'undefined'
	return (
		<div className={"pb4 flex flex-column flex-row-l w-100 " + (hasImages ? "w-100-l" : "w-30-l dib")} id={props.slug}
			style={{
				backgroundColor: hasImages ? 'transparent' : '#F6F5F4',
				color: '#2A2B2A',
				borderRadius: hasImages ? '0px' : '1rem',
				margin: hasImages ? '0px' : '1rem 1rem 0 0',
				padding: hasImages ? '0px' : '1rem',
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
				<h2 className="ttu fw4 mb2 f7 o-60" style={{letterSpacing: '0.05em'}}>{props.title}</h2> 
				{ (typeof props.subtitle != 'undefined') && 
					<h3 className="f3 mt0 fw6">{props.subtitle}</h3> 
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