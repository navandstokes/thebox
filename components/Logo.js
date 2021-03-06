import Link from 'next/link'

export const Logo = props => {
	return (
		<div className={props.className} style={props.style}>
			<Link href="/">
				<a>
					<h2 className="dib f4 f2-l white mv3 mv2-l">TheBox</h2>
				</a>
			</Link>
		</div>
	)
}