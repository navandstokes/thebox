import React, { Component } from 'react'
const axios = require('axios')

export default class Bot extends Component {
	constructor() {
		super()
		this.state = {
			bot: false,
			success: false
		}
	}

	botStart = () => {
		this.setState({bot: true})

		var cf = require("conversational-form")

		document.getElementById("bot").style.height = "75vh"

		var cfInstance = cf.startTheConversation({
			formEl: document.getElementById("form"),
			context: document.getElementById("bot"),
			preventAutoStart: false,
			preventAutoAppend: false,
			userInterfaceOptions:{
				controlElementsInAnimationDelay: 250,
				robot: {
					robotResponseTime: 0,
					chainedResponseTime: 600
				},
				user:{
					showThinking: false,
					showThumb: false
				}
			},
			submitCallback: function(){
				var formDataSerialized = cfInstance.getFormData(true)
				var today = new Date()
				const today_formatted = today.toLocaleString('en-AU', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})
				axios.post('/api/email', {
				    to: formDataSerialized.email,
				    from: '"Vogue Dental Studios" <test@example.com.au>',
				    template_id: 'd-b110c2a314b14de68f863bf9d4cbc748',
				    substitutions: {
						"-date-": today_formatted,
						"-name-": formDataSerialized.name,
						"-service-": formDataSerialized.service[0],
						"-soon-": formDataSerialized.soonest,
						"-free-": formDataSerialized.free,
						"-message-": formDataSerialized.message
				    }
				  })
				  .then(function (response) {
				    console.log(response);
					cfInstance.remove()
					document.getElementById("bot").style.height = "auto"
					botFinish()
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
			}
		})
		const botFinish = () => {
			this.setState({success: true, bot: false})
		}
	}


	render() {
		return (
			<div id="bot" className={"w-100 w9-50-ns dark-gray auto"}>
				{(!this.state.bot) && (this.state.success ? (
					<BotSuccess />
				) : (
					<BotStart handleClick={this.botStart} />
				))}
			</div>
		)
	}
}

export const BotStart = props => {
	return (
		<div className="mt4 mb5" style={{padding: '0 20px'}}>
			<div style={{
				paddingLeft: '48px',
				maxWidth: '80%',
				position: 'relative'
			}}>
				<div style={{
					backgroundImage: 'url("https://cf-4053.kxcdn.com/conversational-form/robot.png")',
					backgroundColor: 'rgb(236, 236, 236)',
					backgroundSize: '20px 20px',
					backgroundPosition: 'center center',
					backgroundRepeat: 'no-repeat',
					width: '42px',
					height: '42px',
					borderRadius: '50%',
					position: 'absolute',
					bottom: 0,
					left: 0
				}}></div>
				<div className="dib">
					<p className="bg-blue" style={{
						paddingTop: '12px',
						paddingRight: '24px',
						paddingBottom: '12px',
						paddingLeft: '24px',
						margin: 0,
						borderRadius: '20px',
						borderBottomLeftRadius: '4px',
						color: '#fff'
					}}>Hi, I'm Esteban. Ready to book your free consult?</p>
				</div>
			</div>
			<div style={{marginLeft: '48px'}}>
				<a onClick={(e) => {e.preventDefault(); props.handleClick()}}>
					<div className="dib bg-white ba ph3 pv2 br3 mt3">
						<span>Start Booking</span>
					</div>
				</a>
			</div>
		</div>
	)
}

export const BotSuccess = props => {
	return (
		<div className="mt4 mb5" style={{padding: '0 20px'}}>
			<div style={{
				paddingLeft: '48px',
				maxWidth: '80%',
				position: 'relative'
			}}>
				<div style={{
					backgroundImage: 'url("https://cf-4053.kxcdn.com/conversational-form/robot.png")',
					backgroundColor: 'rgb(236, 236, 236)',
					backgroundSize: '20px 20px',
					backgroundPosition: 'center center',
					backgroundRepeat: 'no-repeat',
					width: '42px',
					height: '42px',
					borderRadius: '50%',
					position: 'absolute',
					bottom: 0,
					left: 0
				}}></div>
				<div className="dib">
					<p className="bg-blue" style={{
						paddingTop: '12px',
						paddingRight: '24px',
						paddingBottom: '12px',
						paddingLeft: '24px',
						margin: 0,
						borderRadius: '20px',
						borderBottomLeftRadius: '4px',
						color: '#fff'
					}}>We can't wait to see you! A team member will get in touch with you shortly.</p>
				</div>
			</div>
		</div>
	)
}