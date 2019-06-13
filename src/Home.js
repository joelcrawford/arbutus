import React from 'react'
import headerImage from './assets/images/mad_sav_roses_more_square.jpg'

export default () => {
    return (
        <section className="intro">
            <header>
                <h1>Arbutus Band</h1>
                <p>New EP coming out August 2019</p>
                {/* <ul className="actions">
                    <li>
                        <a href="#first" className="arrow scrolly">
                            <span className="label">Next</span>
                        </a>
                    </li>
                </ul> */}
            </header>
            <div className="content">
                <span className="image fill" data-position="center">
                    <img src={headerImage} alt="" />
                </span>
            </div>
        </section>
    )
}
