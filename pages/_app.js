import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import api from '../api'
import { NavPanel } from '../components/NavPanel'
import { Navbar, NavbarWithRef } from '../components/Navbar'
import { Footer } from '../components/Footer'
import Bot from '../components/Bot'
import { Waypoint } from 'react-waypoint'
import '../static/tachyons.css'
import '../static/generic.css'
import '../static/form.css'

export default class MyApp extends App {
  constructor() {
    super()
    this.state = {
      nav: false,
      bot: false
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, router } = this.props

    const menu = [
      {title: 'How it works', slug: 'how-it-works'},
      {title: 'Results', slug: 'results'},
      {title: 'Pricing', slug: 'pricing'},
      {title: 'Insurance', slug: 'insurance'},
      {title: 'Veneers & More', url: 'https://voguedentalstudios.com.au'}
    ]

    const menu_2 = [
      {title: 'Book Free Consult', slug: 'book-consultation'},
      {title: 'Contact Us', slug: 'contact-us'}
    ]

    const menu_3 = [
      {title: 'Message us', url: 'https://m.me/voguedentalstudios', icon: 'ChatIcon'},
      {title: 'Invite a friend', slug: 'for-besties', block: 'Get $50', icon: 'GiftIcon'},
      {title: '1300 764 536', url: 'tel:+61398788208', icon: 'PhoneIcon'}
    ]

    const footerMenu = [
    { 
      title: 'Learn More',
      children: [
        {title: 'About Us', slug: 'about-us'},
        {title: 'Veneers & More', url: 'https://voguedentalstudios.com.au'},
        {title: 'Facebook', url: 'https://facebook.com/voguedentalstudios'},
        {title: 'Instagram', url: 'https://instagram.com/voguedentalstudios'}
      ]
    },
    {
      title: 'Support',
      children: [
        {title: 'FAQs', slug: 'faqs'},
        {title: '1300 764 536', url: 'tel:+61398788208'},
        {title: 'Contact', slug: 'contact-us'}
      ]
    }
    ]

    return (
      <Container>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Raleway:900&display=swap" rel="stylesheet" />
          <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <div id="form" ref="form" className="form">
          <input type="text" id="name" name="name" cf-questions="Hi Friend&&What is your name?" />
          <fieldset cf-questions="Thanks, {previous-answer}.&&Which service are you most interested in?">
            <input type="radio" name="service" id="service-invisalign" value="invisalign" />
            <label htmlFor="service-invisalign">Invisalign</label>
            <input type="radio" name="service" id="service-whitening" value="whitening" />
            <label htmlFor="service-whitening">Whitening</label>
            <input type="radio" name="service" id="service-other" value="other" />
            <label htmlFor="service-other">Other</label>
          </fieldset>
          <input type="text" name="soonest" cf-questions="When is the soonest you can come in? (e.g. next Wednesday)" />
          <input type="text" name="free" cf-questions="When are you usually free? (e.g. Friday after 3pm)" />
          <input type="email" name="email"
                  pattern="(\w+)\@(\w+)\.[a-zA-Z]"
                  cf-error="Email address invalid"
                  cf-questions="Fantastic.&&What's your email address?" />
          <fieldset cf-questions="And what is the best way to reach you?">
            <input type="radio" name="contact-method" id="contact-phone" value="phone" />
            <label htmlFor="contact-phone">Phone</label>
            <input type="radio" name="contact-method" id="contact-email" value="email" />
            <label htmlFor="contact-email">Email</label>
          </fieldset>
          <input type="tel" name="phone"
                  pattern=""
                  cf-error="Phone number invalid"
                  cf-questions="No problem. What's your phone number?"
                  cf-conditional-contact-method="phone" />
        </div>
        <Bot />
        <Footer items={footerMenu} />
        <Waypoint onEnter={() => {this.setState({nav: false})}}
                  onLeave={() => {this.setState({nav: true})}}>
          <div className="absolute top-0 left-0 w-100 pt4 ">
            <NavbarWithRef items={menu} color="white"/>
          </div>
        </Waypoint>
        <NavPanel items={menu} menu2={menu_2} menu3={menu_3} nav={this.state.nav} />
      </Container>
    )
  }
}