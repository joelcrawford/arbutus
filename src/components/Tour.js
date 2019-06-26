import React from 'react'
import * as moment from 'moment'
import { setImg, getRandomInt, bestFalIcons, formatDateString } from '../store/actions'

import '../assets/sass/arbutus/tour.scss'

const handleClick = (address, title, subtitle, e) => {
    console.log(address, title, subtitle, e)
}

export default ({data, events}) => {

    if(!data || !events) { return null }
    const featuredImage = setImg(data, 'medium_large')
    
    return (
        <section id={data.slug}>
            <header>
                <h2 className="img-header">{data.acf.title}</h2>
                <span className="image main img-no-margin"><img src={featuredImage} alt="" /></span>
            </header>
            <div className="content">
                <p>{data.acf.subtitle}</p>
                <ul className="feature-icons">

                    {events.map((p, i) => {
                        let f = bestFalIcons[getRandomInt(0, bestFalIcons.length - 1)]
                        const { 
                            city, eventdate, address, 
                            venue, title, subtitle } = p.acf

                        const d = moment(new Date(eventdate)).format(formatDateString)
                            // solid fa-bolt
                        return (
                            <div key={i} className="tour-details">
                                <li className={`fal fa-${f}`}>
                                    <p className="tour-meta">{d}</p>
                                    <h3 className="tour-city">{city}</h3>
                                    <div className="tour-venue">{venue}</div>
                                    <div 
                                        className="show-map" 
                                        onClick={(e) => handleClick(address, title, subtitle, e)}>
                                            SHOW MAP
                                    </div> 
                                </li>
                            </div>
                        ) 
                    })}

                </ul>
                <p></p>
            </div>
        </section>
    )
}
