import React from 'react'

import full01 from './assets/images/gallery/fulls/01.jpg'
import full02 from './assets/images/gallery/fulls/02.jpg'
import full03 from './assets/images/gallery/fulls/03.jpg'
import full04 from './assets/images/gallery/fulls/04.jpg'

export default ({anchor}) => {
    return (
        <section id={anchor}>
            <header>
                <h2>Gallery</h2>
                <p>Maybe this could be 10 most recent images from Instagram feed?</p>
            </header>
            <div className="content">
                <div className="gallery">
                    <a href="images/gallery/fulls/01.jpg" className="landscape">
                        <img src={full01} alt="" />
                    </a>
                    <a href="images/gallery/fulls/02.jpg">
                        <img src={full02} alt="" />
                    </a>
                    <a href="images/gallery/fulls/03.jpg">
                        <img src={full03} alt="" />
                    </a>
                    <a href="images/gallery/fulls/04.jpg" className="landscape">
                        <img src={full04} alt="" />
                    </a>
                </div>
            </div>
        </section>
    )
}
