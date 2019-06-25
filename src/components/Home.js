import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
//import headerImage from '../assets/images/mad_sav_roses_more_square.jpg'


const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth"
    }); 
  }

const data1 = {
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

data1.pages.sort((a, b) => (a.order > b.order) ? 1 : -1)

export default ({data, menu}) => {
    let headerImage = null
    if(!data) {
        return null
    }

    if(!!data._embedded['wp:featuredmedia'][0]) {
        headerImage = data._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url
    }

    console.log(data._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url)

    return (
        <section id={data.slug} className="intro">
            <header>
                <h1>{data.acf.title}</h1>
                <ul className="header-text-grouping">
                    {menu.map((o, i) => {
                        //if(!o.feature) { return null }
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
