import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const Img = props => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-60px 0px'
    })

    const [loaded, setLoad] = useState(false)

    const ratio = props.ratio ? props.ratio : (9/16)

    const { contentType, url } = props.file

    // Some hard code to retain crop in Prismic
    let rect = ''

    if (url.split("&rect").length > 1) {
        rect = url.split(/(?=&rect=)/g)[1].split(/(?=&)/g)[0]
    }

    let Content = ''
    switch(contentType) {
        case 'image/jpeg':
        Content =   <picture style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'block', 
                        width: '100%',
                        height: '100%',
                        fontSize: '0'
                    }}
                    data-alt={props.alt} 
                    data-iesrc={props.file.url} 
                    onLoad={() => {setLoad(true)}} >
                    <style jsx>{`
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: center top;
                            display: block;
                            vertical-align: top;
                            opacity: ${loaded ? 1 : 0};
                            transition: all 0.5s linear;
                        }
                        `}</style>
                        <source type="image/webp" 
                            srcSet={`
                                ${props.file.url.split('?')[0]}?w=200&fm=webp${rect} 200w,
                                ${props.file.url.split('?')[0]}?w=400&fm=webp${rect} 400w,
                                ${props.file.url.split('?')[0]}?w=800&fm=webp${rect} 800w,
                                ${props.file.url.split('?')[0]}?w=1200&fm=webp${rect} 1200w,
                                ${props.file.url.split('?')[0]}?w=1600&fm=webp${rect} 1600w,
                                ${props.file.url.split('?')[0]}?w=2000&fm=webp${rect} 2000w
                            `} 
                            sizes={props.sizes ? props.sizes : '100vw'}
                        />
                        <source type="image/jpeg" 
                            srcSet={`
                                ${props.file.url.split('?')[0]}?w=200&fm=jpg&fl=progressive${rect} 200w,
                                ${props.file.url.split('?')[0]}?w=400&fm=jpg&fl=progressive${rect} 400w,
                                ${props.file.url.split('?')[0]}?w=800&fm=jpg&fl=progressive${rect} 800w,
                                ${props.file.url.split('?')[0]}?w=1200&fm=jpg&fl=progressive${rect} 1200w,
                                ${props.file.url.split('?')[0]}?w=1600&fm=jpg&fl=progressive${rect} 1600w,
                                ${props.file.url.split('?')[0]}?w=2000&fm=jpg&fl=progressive${rect} 2000w
                            `} 
                            sizes={props.sizes ? props.sizes : '100vw'}
                        />
                        { inView &&
                            <img alt={props.alt} className={(props.className ? props.className : "")} style={props.style} />
                        }
                        <noscript><img src={props.file.url} alt={props.alt} /></noscript>
                    </picture>
        break
        case 'image/png':
        Content =   <picture style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        display: 'block', 
                        width: '100%',
                        height: '100%',
                        fontSize: '0'
                    }}
                    data-alt={props.alt} 
                    data-iesrc={props.file.url} 
                    onLoad={() => {setLoad(true)}} >
                    <style jsx>{`
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            display: block;
                            vertical-align: top;
                            opacity: ${loaded ? 1 : 0};
                            transition: all 0.5s linear;
                        }
                        `}</style>
                        <source type="image/webp" 
                            srcSet={`
                                ${props.file.url}?w=200&fm=webp 200w,
                                ${props.file.url}?w=400&fm=webp 400w,
                                ${props.file.url}?w=800&fm=webp 800w,
                                ${props.file.url}?w=1200&fm=webp 1200w,
                                ${props.file.url}?w=1600&fm=webp 1600w,
                                ${props.file.url}?w=2000&fm=webp 2000w
                            `} 
                            sizes={props.sizes ? props.sizes : '100vw'}
                        />
                        <source type="image/jpeg" 
                            srcSet={`
                                ${props.file.url}?w=200&fm=jpg&fl=progressive 200w,
                                ${props.file.url}?w=400&fm=jpg&fl=progressive 400w,
                                ${props.file.url}?w=800&fm=jpg&fl=progressive 800w,
                                ${props.file.url}?w=1200&fm=jpg&fl=progressive 1200w,
                                ${props.file.url}?w=1600&fm=jpg&fl=progressive 1600w,
                                ${props.file.url}?w=2000&fm=jpg&fl=progressive 2000w
                            `} 
                            sizes={props.sizes ? props.sizes : '100vw'}
                        />
                        { inView &&
                            <img alt={props.alt} className={(props.className ? props.className : "")} style={props.style} />
                        }
                        <noscript><img src={props.file.url} alt={props.alt} /></noscript>
                    </picture>
        break
        case 'image/svg+xml':
            Content = <img src={props.file.url} alt={props.alt} className="absolute top-0 left-0 w-100" />
        break
    }

    return (
        <div ref={ref} style={{
            width: (props.width ? props.width : '100%'),
            position: 'relative',
            paddingBottom: `${ratio * 100}%`,
            backgroundColor: (props.bgColor ? props.bgColor : '#f4f4f4')
        }}>
            {Content}
        </div>
    )
}