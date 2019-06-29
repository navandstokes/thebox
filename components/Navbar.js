import React from 'react'
import { Menu } from './Menu'
import { Logo } from './Logo'

export const Navbar = props => {
	return (
		<div className="flex-ns flex-row items-center">
			<div className="w4 mh4">
				<Logo color={props.color} />
			</div>
			<div className="dn flex-ns flex-row w-60 justify-between">
				<Menu items={props.items} color={props.color}/>
			</div>
		</div>
	)
}

//TODO ugghhh why isn't this working
export const NavbarWithRef = React.forwardRef((props, ref) => {
	return <Navbar innerRef={ref} {...props} />
})