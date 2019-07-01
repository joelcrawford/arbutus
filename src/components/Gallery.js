import React from 'react'
import { instaOptions } from '../store/config'

import full01 from '../assets/images/gallery/fulls/01.jpg'
import full02 from '../assets/images/gallery/fulls/02.jpg'
import full03 from '../assets/images/gallery/fulls/03.jpg'
import full04 from '../assets/images/gallery/fulls/04.jpg'

import '../assets/sass/arbutus/gallery.scss'

export default ({data, insta}) => {
    if(!data || !insta) { return null }

    const handleImgClick = (e) => {
        e.preventDefault()

    }

    return (
        <section id={data.slug}>
            <header>
                <h2>{data.acf.title}</h2>
                <p dangerouslySetInnerHTML={{__html: data.content.rendered}} />
            </header>
            <div className="content">
                <div className="gallery">
                    {insta.map((img, i) => {
                        console.log(instaOptions.resolution, img.images[instaOptions.resolution].url)
                        const alt = !!img.caption ? img.caption.text : null
                        return (
                            <a href={img.link} target="_blank" rel="noopener noreferrer">
                                
                            <div 
                                //className='landscape'
                                key={i}
                            >
                                <img 
                                    alt={alt} 
                                    src={img.images[instaOptions.resolution].url}
                                    //width={img.images[instaOptions.resolution].width} 
                                    //height={img.images[instaOptions.resolution].height} 
                                />
                                
                            </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
