import React from 'react'
import { Menu } from './Menu'
import { Logo } from './Logo'

export const Navbar = props => {
	return (
		<div className={"w-100 flex flex-row justify-between items-center gutters-pad " + (props.nav ? 'fixed top-0 left-0 bg-white bb b--black-10' : '')}>
			<Logo className="mr4" />
			<div className="flex flex-row justify-between">
				<Menu items={props.items} />
			</div>
		</div>
	)
}