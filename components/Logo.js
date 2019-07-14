import React from 'react'
import Link from 'next/link'

export const Logo = props => {
	return (
		<div className={props.className} style={props.style}>
			<Link href="/">
				<a>
					<h2 className="dib f4 f2-ns white mv2">TheBox</h2>
				</a>
			</Link>
		</div>
	)
}