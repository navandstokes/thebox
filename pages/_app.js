import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import api from '../api'
import ReactPixel from 'react-facebook-pixel'
import { Navbar } from '../components/Navbar'
import { Waypoint } from 'react-waypoint'
import '../static/tachyons.css'
import '../static/generic.css'

export default class MyApp extends App {
  constructor() {
    super()
    this.state = {
      width: 0,
      height: 0
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  _handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  componentDidMount = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.addEventListener('resize', this._handleResize)

    ReactPixel.init('487591398674776')
    ReactPixel.pageView()
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this._handleResize)
  }

  render () {
    const { Component, pageProps, router } = this.props

    const menu = [
      {title: 'Tech', slug: 'tech'},
      {title: 'Living', slug: 'living'},
      {title: 'Travel', slug: 'travel'}
    ]

    return (
      <Container>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Raleway:900&display=swap" rel="stylesheet" />
          <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />
        </Head>
        <Navbar items={menu} color="white" nav={this.state.nav} />
        <Waypoint onEnter={() => {this.setState({nav: false})}}
                  onLeave={() => {this.setState({nav: true})}} />
        <Component ns={this.state.width > 960} {...pageProps} />
      </Container>
    )
  }
}