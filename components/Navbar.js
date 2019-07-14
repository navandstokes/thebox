import React from 'react'
import { Menu } from './Menu'
import { Logo } from './Logo'

export const Navbar = props => {
	return (
		<div className={"w-100 flex flex-row justify-between items-center gutters-pad bg-blue " + (props.nav ? 'fixed top-0 left-0 bg-white bb b--black-10' : '')}
			style={{boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)'}}>
			<Logo />
			<div className="flex flex-row">
				<Menu items={props.items} />
			</div>
		</div>
	)
}