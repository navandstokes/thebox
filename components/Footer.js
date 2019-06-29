import React from 'react'
import Link from 'next/link'
import { Menu } from './Menu'
import { InvisalignLogo, Logo } from './Logo'

export const Footer = props => {

  	const { items } = props
    return (
		<footer className="gray svg-fill-current pv5 bt b--black-10">
			<div className="gutters">
				<Logo color='#3d3d3d' className="w4 mb4" />
				<div className="flex-grow-1 flex-ns gutters-ns justify-between-l pl1">
					<Menu sub items={items} />
				</div>
				<InvisalignLogo className="w-30 mv5" bgColor='#fff' color='#777' />
			</div>
			<div className="gutters-pad">
				<FooterCopyright />
			</div>
		</footer>
    );
}

const FooterCopyright = props => {
	const year = (new Date()).getFullYear();
	return (
		<div className="flex justify-between items-center f7">
			<div>
				<p className="light-silver">© {year} Vogue Dental Studios</p>
			</div>
			<div>
				<a className="link light-silver" href="/terms-and-conditions">Terms</a>
				<span className="ph2 o-40">|</span>
				<a className="link light-silver" href="/privacy">Privacy</a>
			</div>
		</div>
	)
}