import React from 'react'
import * as moment from 'moment'
import { setImg, sortByNested, getRandomInt, bestFalIcons, formatDateString } from '../store/actions'

import '../assets/sass/arbutus/tour.scss'

export default React.memo(({data, events}) => {

    if(!data || !events) { return null }
    
    sortByNested('acf.eventdate', events)
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
                        const { city, eventdate, eventlisting, venue } = p.acf
                        const d = moment(eventdate).format(formatDateString)

                        const tourDetails = (
                            <div key={i} className="tour-details">
                                <li className={`fal fa-${f}`}>
                                
                                    <p dangerouslySetInnerHTML={{__html: d}}
                                        className="tour-meta" />
                                    <h3 className="tour-city">{city}</h3>
                                    <div className="tour-venue">{venue}</div>
                                    <div className="show-listing">VIEW EVENT LISTING</div> 
                                </li>
                            </div>
                            
                        )

                        if(eventlisting) {
                            return (
                                <a className="tour-listing" key={i} href={eventlisting} target="_blank" rel="noreferrer noopener">
                                    {tourDetails}
                                </a>
                            ) 
                        }

                        return tourDetails
                        
                    })}

                </ul>
            </div>
        </section>
    )
})
