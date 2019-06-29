import React, { useState } from 'react'
import Link from 'next/link'
import { Renderer } from './Renderer'

export const AccordionBlock = props => {
	let Accordions = ''
	if ( typeof(props.accordions) != 'undefined') {
		Accordions = props.accordions.map(item => {
			return (
				<React.Fragment key={item.sys.id}>
					<Accordion {...item.fields} />
				</React.Fragment>
			)
		})
	}
	return (
		<div className="gutters pb4">
			<h1>{props.title}</h1>
			<h2>{props.subtitle}</h2>
			{Accordions}
		</div>
	)
}

export const Accordion = props => {
	const [active, toggleActive] = useState(false)
	return (
		<div className={"mt5-ns mt0-l mr4-ns mr5-l bt bn-ns b--black-20 " + (active ? "menu--active" : "")}>
		<style jsx>{`
			div:nth-of-type(1) {
				border: none;
			}
			svg {
				transform: rotate(180deg);
				transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
			}
			.menu--active svg {
				transform: rotate(0deg);
			}
			.content {
				transition: all 300ms cubic-bezier(0.215, 0.61, 0.355, 1);
			}
			.menu--active .content {
				/* TODO Hard code need to change */
				// padding: 0 6vw 3vw 6vw;
				max-height: 10000px;
				height: auto;
				opacity: 1;
			}
		`}</style>
			<a className="db w-100" onClick={(e) => {e.preventDefault(); toggleActive(!active)}}>
				<div className="flex justify-between items-center svg-fill-current">
				{ (typeof(props.title) != "undefined") &&
	      			<h4 className="fw7 w-100">{props.title.split('$')[0]}<span className="fr silver">{props.title.split(/(?=\$)/)[1]}</span></h4>
				}
	      			<span className="dib pl5">
  						<svg className="h3 w1" fill="#3573dd" role="img" viewBox="0 0 307.054 307.054">
	  						<path d="M302.445 205.788L164.63 67.959c-6.136-6.13-16.074-6.13-22.203 0L4.597 205.788c-6.129 6.132-6.129 16.069 0 22.201l11.101 11.101c6.129 6.136 16.076 6.136 22.209 0l115.62-115.626L269.151 239.09c6.128 6.136 16.07 6.136 22.201 0l11.101-11.101c6.136-6.139 6.136-16.069-.008-22.201z"/>
  						</svg>
	      			</span>
				</div>
			</a>
			<div className="content pt3-ns aspect-ratio overflow-hidden h-auto-ns">
				<Renderer content={props.description} />
			</div>
	    </div>
	)
}