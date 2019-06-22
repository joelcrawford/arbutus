import React from 'react'
import canadaMap from './assets/images/canada.png'

import './assets/sass/arbutus/tour.scss'

export default ({anchor}) => {
    return (
        <section id={anchor}>
            <header>
                <h2 className="img-header">Tour stops on our way across Canada...</h2>
                <span className="image main img-no-margin"><img src={canadaMap} alt="" /></span>
            </header>
            <div className="content">
                <p><strong>Book us</strong> if you want more stops!</p>
                <ul className="feature-icons">
                    <li className="icon solid fa-bolt">Montreal</li>
                    <li className="icon solid fa-bolt">Toronto</li>
                    <li className="icon solid fa-bolt">Winnipeg</li>
                    <li className="icon solid fa-bolt">Saskatoon</li>
                    <li className="icon solid fa-bolt">Edmonton</li>
                    <li className="icon solid fa-bolt">Vancouver</li>
                </ul>
                <p></p>
            </div>
        </section>
    )
}
