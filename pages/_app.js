import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import api from '../api'
import { Navbar } from '../components/Navbar'
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
        <Component {...pageProps} />
      </Container>
    )
  }
}