import React from 'react'
import '../assets/sass/arbutus/contact.scss'
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
                                className="icon brands fa-facebook-f"
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="label">Facebook</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={data.acf.instagram}
                                className="icon brands fa-instagram"
                                target="_blank"
                                rel="noopener noreferrer">
                                <span className="label">Instagram</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
                
            </div>
        </section>
    )
}
