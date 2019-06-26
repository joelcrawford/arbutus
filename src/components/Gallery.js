import React from 'react'

import full01 from '../assets/images/gallery/fulls/01.jpg'
import full02 from '../assets/images/gallery/fulls/02.jpg'
import full03 from '../assets/images/gallery/fulls/03.jpg'
import full04 from '../assets/images/gallery/fulls/04.jpg'

import '../assets/sass/arbutus/gallery.scss'

export default ({data}) => {
    if(!data) { return null }
    return (
        <section id={data.slug}>
            <header>
                <h2>{data.acf.title}</h2>
                <p dangerouslySetInnerHTML={{__html: data.content.rendered}} />
            </header>
            <div className="content">
                <div className="gallery">
                    <div className="landscape">
                        <img src={full01} alt="" />
                    </div>
                    <div>
                        <img src={full02} alt="" />
                    </div>
                    <div>
                        <img src={full03} alt="" />
                    </div>
                    <div className="landscape">
                        <img src={full04} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}
