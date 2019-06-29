import React, { useState } from 'react'
import Link from 'next/link'
import { Spring } from 'react-spring/renderprops.cjs'
import { Hamburger, Icon } from '../components/Icon'
import { Logo } from './Logo'

export const NavPanel = props => {
	const [active, toggleActive] = useState(false)
	const Links = props.items.map((item, index) => {
		const href = item.slug ? '/page?slug=' + item.slug : item.url
		const href_as = item.slug ? '/' + item.slug : item.url
		return (
			<div key={item.title} className="mv2">
				<Link href={href} as={href_as}>
					<a onClick={() => {toggleActive(!active)}}>
						<h4 className="ma0">
							{item.title}
						</h4>
					</a>
				</Link>
			</div>
		)
	})
	// TODO get rid of this hard code
	const Links_2 = props.menu2.map((item, index) => {
		const href = item.slug ? '/page?slug=' + item.slug : item.url
		const href_as = item.slug ? '/' + item.slug : item.url
		return (
			<div key={item.title} className="mv2">
				<Link href={href} as={href_as}>
					<a onClick={() => {toggleActive(!active)}}>
						<h4 className="ma0">
							{item.title}
						</h4>
					</a>
				</Link>
			</div>
		)
	})
	const Links_3 = props.menu3.map((item, index) => {
		const href = item.slug ? '/page?slug=' + item.slug : item.url
		const href_as = item.slug ? '/' + item.slug : item.url
		return (
			<div key={item.title} className="mv2">
				<Link href={href} as={href_as}>
					<a onClick={() => {toggleActive(!active)}}
						className={(typeof(item.block) != "undefined") ? "dark-pink" : ""}>
						{ (typeof(item.icon) != "undefined") &&
							<Icon icon={item.icon} size="1.5rem" className="mr2" />
						}
						<h4 className="dib ma0">
							{item.title}
						{ (typeof(item.block) != "undefined") &&
							<span className="dib bg-dark-pink white ml2 ph2 br2 f6">{item.block}</span>
						}
						</h4>
					</a>
				</Link>
			</div>
		)
	})
	return (
		<div>
			<div className={"top-0 right-0 z-9999 ma4 pa1 br3 fixed " + ((props.nav && !active) ? " bg-blue" : "") + (active ? " blue" : " white")}>
				<Hamburger  size="1.5rem" 
							active={active} 
							handleClick={() => {toggleActive(!active)}} />
			</div>
			<Spring
				from={{
					display: 'none',
					opacity: 0
				}}
				to={{
					display: active ? 'block' : 'none',
					opacity: active ? 0.25 : 0
				}}
				config={{
					tension: 280, 
					friction: 60
				}}
			>
				{props => <div className="fixed top-0 left-0 w-100 vh-100 bg-black" style={props}></div>}
			</Spring>
			<Spring
				from={{ right: '-75vw' }}
				to={{ right: active ? '0vw' : '-75vw' }}
				config={{
					tension: 280, 
					friction: 30
				}}
			>
				{props => {
					return (
						<div className="fixed top-0 w-75 z-999 vh-100 bg-white blue pa4" style={props}>
							<div className="w4 mb4">
								<Logo color='#3d3d3d' />
							</div>
							{Links}
							<hr className="o-30 mv4"/>
							{Links_2}
							<hr className="o-30 mv4"/>
							{Links_3}
						</div>
					)
				}}
			</Spring>
		</div>
	)
}