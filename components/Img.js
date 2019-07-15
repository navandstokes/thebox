import React from 'react'
import PropTypes from 'prop-types'
// import { TueriContext } from './Provider'
// import kebabCase from 'lodash.kebabcase'

class Img extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isInViewport: false,
            width: 0,
            height: 0,
            lqipLoaded: false,
            fullsizeLoaded: false
        }

        this.imgRef = React.createRef()
        this.window = typeof window !== 'undefined' && window 
        this.handleViewport = this.handleViewport.bind(this)       
        this.isWebpSupported = this.isWebpSupported.bind(this)

    }

    componentDidMount = () => {
        // const width = this.imgRef.current.clientWidth
        const width = this.props.width ? this.props.width : 600
        const height = this.props.height ? this.props.height : 600

        this.setState({
            width: width,
            height: height
        })
        
        this.handleViewport()

        this.window.addEventListener('scroll', this.handleViewport)

    }

    handleViewport() {
        if (this.imgRef.current && !this.state.lqipLoaded) {
            const windowHeight = this.window.innerHeight
            const imageTopPosition = this.imgRef.current.getBoundingClientRect().top
            const buffer = typeof this.props.buffer === 'number' && this.props.buffer > 1 && this.props.buffer < 10 ? this.props.buffer : 1.5
            if (windowHeight * buffer > imageTopPosition) {
                this.setState({
                    isInViewport: true
                })
            }

        }
    }

    isWebpSupported() {
        if (!this.window.createImageBitmap) {
            return false;
        }
        return true;
    }

    componentWillUnmount() {
        this.window.removeEventListener('scroll', this.handleViewport)
    }

    render() {

        // Destructure props and state
        const { src, alt, options = {}, ext = 'jpg', fit } = this.props
        const { isInViewport, width, fullsizeLoaded, height } = this.state

        // Create an empty query string
        let queryString = ''

        // If width is specified, otherwise use auto-detected width
        options['w'] = options['w'] || width
        options['h'] = options['h'] || height
        options['fit'] = fit || 'pad'

        // If a format has not been specified, detect webp support
        // if (!options['fm'] && this.isWebpSupported) {
        //     options['fm'] = 'webp'
        // }

        // Loop through option prop and build queryString
        Object.keys(options).map((option, i) => {
            return queryString +=  `${i < 1 ? '?' : '&'}${option}=${options[option]}`
        })

        // Modify the queryString for the LQIP image: replace the width param with a value 1/10 the fullsize
        const lqipQueryString = queryString + "&q=10"

        const styles = {
            figure: {
                position: 'relative',
                margin: 0
            },
            lqip: {
                // width: '100%',
                filter: 'blur(5px)',
                opacity: 1,
                transition: 'all 0.5s ease-in'
            },
            fullsize: {
                position: 'absolute',
                top: '0px',
                left: '0px',
                transition: 'all 0.5s ease-in'
            }
        }

        // When the fullsize image is loaded, fade out the LQIP
        if (fullsizeLoaded) {
            styles.lqip.opacity = 0
        }

        return(
        <React.Fragment>
                <figure
                    style={ styles.figure }
                    ref={this.imgRef}
                >
                    {
                        // 
                        isInViewport && width > 0 ? (
                            <React.Fragment>

                                {/* Load fullsize image in background */}
                                <picture onLoad={ () => { this.setState({ fullsizeLoaded: true }) } }
                                        style={ styles.fullsize }>
                                    <source sourceset={`${ src }${ queryString }?fm=webp`} type="image/webp" />
                                    <source sourceset={`${ src }${ queryString }`} type="image/jpeg" />
                                    <img 
                                        src={`${ src }${ queryString }`}
                                    />
                                </picture>

                                {/* Load LQIP in foreground */}
                                <picture
                                        onLoad={ () => { this.setState({ lqipLoaded: true }) } }
                                        style={ styles.lqip }>
                                    <source sourceset={`${ src }${ lqipQueryString }`} type="image/webp" />
                                    <source sourceset={`${ src }${ lqipQueryString }`} type="image/jpeg" />
                                    <img 
                                        src={`${ src }${ lqipQueryString }`} 
                                    />
                                </picture>
                            </React.Fragment>
                        ) : null
                    }            
                </figure>
            </React.Fragment>
        )

    }
}

Img.propTypes = {
    src: PropTypes.string.isRequired,
    // alt: PropTypes.string.isRequired,
    options: PropTypes.object,
    ext: PropTypes.string,
    buffer: PropTypes.number
}

export default Img