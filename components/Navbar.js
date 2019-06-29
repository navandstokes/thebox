import React from 'react'
import { Menu } from './Menu'
import { Logo } from './Logo'

export const Navbar = props => {
	return (
		<div className="flex-ns flex-row items-center">
			<div className="w4 mh4">
				<Logo color={props.color} />
			</div>
			<div className="flex flex-row w-80 w-60-ns justify-between">
				<Menu items={props.items} color={props.color}/>
			</div>
		</div>
	)
}

//TODO ugghhh why isn't this working
export const NavbarWithRef = React.forwardRef((props, ref) => {
	return <Navbar innerRef={ref} {...props} />
})