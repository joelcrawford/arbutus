import React from 'react'
import { setImg } from '../store/actions'

import '../assets/sass/arbutus/tour.scss'

export default ({data, events}) => {

    if(!data || !events) { return null }
    const featuredImage = setImg(data)
    console.log('from tour', data, events)

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
                        return (
                            <li key={i} className="icon solid fa-bolt">
                                {p.acf.city}
                            </li>
                        ) 
                    })}

                </ul>
                <p></p>
            </div>
        </section>
    )
}
