import React from 'react'

import full01 from '../assets/images/gallery/fulls/01.jpg'
import full02 from '../assets/images/gallery/fulls/02.jpg'
import full03 from '../assets/images/gallery/fulls/03.jpg'
import full04 from '../assets/images/gallery/fulls/04.jpg'

import '../assets/sass/arbutus/gallery.scss'

export default ({anchor}) => {
    return (
        <section id={anchor}>
            <header>
                <h2>Gallery</h2>
                <p>Maybe this could be 10 most recent images from Instagram feed?</p>
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
