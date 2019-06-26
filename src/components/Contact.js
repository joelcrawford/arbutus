import React from 'react'
import '../assets/sass/arbutus/contact.scss'

import facebookIcon from '@fortawesome/fontawesome-pro/svgs/brands/facebook-f.svg'
import instagramIcon from '@fortawesome/fontawesome-pro/svgs/brands/instagram.svg'

export default ({data}) => {
    if(!data) { return null }
    return (
        <section id={data.slug}>
            <header>
                <h2>{data.acf.title}</h2>
            </header>
            <div className="content">
            <p dangerouslySetInnerHTML={{__html: data.content.rendered}} />
            <ul className="items">
                <li>
                    <h3>Email</h3>
                    <a href={`mailto:${data.acf.email}`}>{data.acf.email}</a>
                </li>
                <li>
                    <h3>Elsewhere</h3>
                    <ul className="icons">
                        <li>
                            <a 
                                href={data.acf.facebook}
                                target="_blank"
                                rel="noopener noreferrer">
                                <img 
                                    className="social-icons" 
                                    src={facebookIcon} 
                                    height="40px" alt="facebook" />
                            </a>
                        </li>
                        <li>
                            <a
                                href={data.acf.instagram}
                                target="_blank"
                                rel="noopener noreferrer">
                                <img 
                                className="social-icons" 
                                src={instagramIcon} 
                                height="40px" alt="instagram" />
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
                
            </div>
        </section>
    )
}
