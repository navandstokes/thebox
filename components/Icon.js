import { IconContext } from 'react-icons'
import { FaFacebookF, FaInstagram, FaMapMarkerAlt } from "react-icons/fa"
import { FiMenu, FiSearch, FiX, FiMessageSquare, FiPhone, FiGift } from "react-icons/fi"

export const Hamburger = props => {
	return (
		<IconContext.Provider value={{size: props.size ? props.size : '1rem'}} >
			<div className={"flex justify-center items-center pointer " + (props.className ? props.className : "")}
				style={{width: props.size ? props.size : '1rem'}}
				onClick={props.handleClick}>
			{
				props.active ? <FiX /> : <FiMenu />
			}
			</div>
		</IconContext.Provider>
	)
}

export const Icon = props => {
	return (
		<IconContext.Provider value={{
			size: props.size ? props.size : '1rem',
			style: { verticalAlign: 'middle'}
		}} >
			<div className={"dib pointer " + props.className}
				style={{width: props.size ? props.size : '1rem'}}
				onClick={props.handleClick}>
				{(() => {
					switch(props.icon) {
						case "SearchIcon":
						return <FiSearch />
						break
						case "ChatIcon":
						return <FiMessageSquare />
						break
						case "PhoneIcon":
						return <FiPhone />
						break
						case "GiftIcon":
						return <FiGift />
						break
					}
				})()}
			</div>
		</IconContext.Provider>
	)
}