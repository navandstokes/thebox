import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import api from '../api'
import ReactPixel from 'react-facebook-pixel'
import { Navbar } from '../components/Navbar'
import { Circle, Messenger } from '../components/Circle'
import '../static/tachyons.css'
import '../static/generic.css'

export default class MyApp extends App {
  constructor() {
    super()
    this.state = {
      nav: false,
      width: 0,
      height: 0,
      lastScrollPos: 0
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

  _handleScroll = (e) => {
    const path = event.path || (event.composedPath && event.composedPath()) || composedPath(event.target)
    function composedPath (el) {

        var path = [];

        while (el) {

            path.push(el);

            if (el.tagName === 'HTML') {

                path.push(document);
                path.push(window);

                return path;
           }

           el = el.parentElement;
        }
    }
    if (path[1].scrollY > 57) {
      if(!this.state.nav) {
        this.setState({
          nav: true
        })
      }
    } else {
      if(this.state.nav) {
        this.setState({
          nav: false
        })
      }
    }
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
    window.addEventListener('scroll', this._handleScroll)
    window.addEventListener('resize', this._handleResize)

    ReactPixel.init('643633719447315')
    ReactPixel.pageView()
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this._handleScroll)
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
        <Navbar items={menu} color="white" nav={true} />
        <Component ns={this.state.width > 960} {...pageProps} />
        <Messenger />
        <Circle />
      </Container>
    )
  }
}