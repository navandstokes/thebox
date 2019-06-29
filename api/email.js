require('dotenv').config()
const express = require("express")
const app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })) // support encoded bodies

const sgMail = require('@sendgrid/mail')

app.get('*', (req, res) => {
  res.send(200, 'API is running.');
})
app.post('*', async (req, res) => {
	try {
		sgMail.setApiKey(process.env.SENDGRID_API_KEY)
		let msg = {
		  to: 'sherrii.cui@gmail.com',
		  from: 'test@example.com',
		  subject: 'Sending with SendGrid is Fun',
		  text: 'inside module exports',
		  html: '<strong>inside module exports<strong>',
		}
		if (req.body) {
			msg = req.body
		}
		await sgMail.send(msg, function(error, response) {
			if (error) {
				console.log(error)
			} else {
				res.end("Mail sent")
			}
		})
		// res.end("Mail sent")
	} catch (err) {
		res.sendStatus(500).json("Failure!", err)
	}
	// res.send(res, 200)
})
module.exports = app