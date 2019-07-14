import React from 'react'
import Link from 'next/link'

export const Menu = props => {
	const Links = props.items.map(item => {
		const href = item.slug ? '/#' + item.slug : item.url
 		return (
			<div key={item.title} className="mr4">
				<Link href={href} passHref>
					<a>
						<h4 className="pa0 ma0 f5 ttu blue">
							{item.title}
						</h4>
					</a>
				</Link>
			</div>
		)
	})
	return (
		<React.Fragment>
			{Links}
		</React.Fragment>
	)
}