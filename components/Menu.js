import React from 'react'
import Link from 'next/link'

export const Menu = props => {
	const Links = props.items.map(item => {
		const href = item.slug ? '/page?slug=' + item.slug : item.url
		const href_as = item.slug ? '/' + item.slug : item.url
		if (item.children) {
			const childrenLinks = item.children.map(child => {
				const childHref = child.slug ? '/page?slug=' + child.slug : child.url
				const childHref_as = child.slug ? '/' + child.slug : child.url
		 		return (
					<React.Fragment key={child.title}>
						<Link href={childHref} as={childHref_as} passHref>
							<a className="link gray">
								<h4 className="f5 fw4 mv3">{child.title}</h4>
							</a>
						</Link>
					</React.Fragment>
				)
			})
			return (
				<div key={item.title} className="dib v-top w-50">
					<h5 className="ttu fw4 tracked f7 blue">{item.title}</h5>
					{childrenLinks}
				</div>
			)
		} else {
	 		return (
				<div key={item.title}>
					<Link href={href} as={href_as} passHref>
						<a>
							<h3 className="ttu pa0 ma0 tracked">
								{item.title}
							</h3>
						</a>
					</Link>
				</div>
			)
		}
	})
	return (
		<React.Fragment>
			{Links}
		</React.Fragment>
	)
}