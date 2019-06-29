import React from 'react'
import Link from 'next/link'

export const Logo = props => {
	return (
		<div className={props.className} style={props.style}>
			<Link href="/">
				<a className="db h-100 w-100">
					<h2>TheBox</h2>
				</a>
			</Link>
		</div>
	)
}