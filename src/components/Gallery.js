import React from 'react'
import { instaArbutus } from '../store/config'

import '../assets/sass/arbutus/gallery.scss'

export default React.memo(({data, insta}) => {
    
    if(!data || !insta) { return null }
    
    return (
        <section id={data.slug}>
            <header>
                <h2>{data.acf.title}</h2>
                <p dangerouslySetInnerHTML={{__html: data.content.rendered}} />
            </header>
            <div className="content">
                <div className="gallery">
                    {insta.map((img, i) => {
                        
                        const alt = !!img.caption ? img.caption.text : null
                        
                        return (
                            <a key={i} href={img.link} target="_blank" rel="noopener noreferrer">
                                <div>
                                    <img 
                                        alt={alt} 
                                        src={img.images[instaArbutus.resolution].url}
                                    />
                                    
                                </div>
                            </a>
                        )
                        
                    })}
                </div>
            </div>
        </section>
    )
})