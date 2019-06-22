import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import headerImage from './assets/images/mad_sav_roses_more_square.jpg'


const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth"
    }); 
  }

const data = {
    anchor: 'home',
    title: 'Arbutus Band',
    pages: [
        {slug: 'about', title: 'Madelyn & Savannah', order: 0, feature:true},
        {slug: 'gallery', title: 'Instagram Feed', order: 3, feature:false},
        {slug: 'listen', title: 'Listen on YouTube', order: 2, feature:true},
        {slug: 'tour', title: 'See our tour dates', order: 1, feature:true},
        {slug: 'contact', title: 'Contact us!', order: 4, feature:true}
    ]
}

data.pages.sort((a, b) => (a.order > b.order) ? 1 : -1)

export default () => {
    return (
        <section id={data.anchor} className="intro">
            <header>
                <h1>{data.title}</h1>
                <ul className="header-text-grouping">
                    {data.pages.map((o, i) => {
                        if(!o.feature) { return null }
                        return (
                            <li key={i}>
                                <Link to={`#${o.slug}`} scroll={el => scrollWithOffset(el, 0)}>
                                    {o.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </header>
            <div className="content">
                <span className="image fill" data-position="center">
                    <img src={headerImage} alt="" />
                </span>
            </div>
        </section>
    )
}
