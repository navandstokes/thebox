import { Menu } from 'components/Menu'
import { Logo } from 'components/Logo'

export const Navbar = props => {
	return (
		<div className="w-100 flex flex-row justify-between items-center gutters-pad bg-blue "
			style={{
				position: 'sticky',
				top: '0',
				boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)',
				zIndex: 9999
			}}>
			<Logo />
			<div className="flex flex-row">
				<Menu items={props.items} />
			</div>
		</div>
	)
}