import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { setImg } from '../store/actions'

const scrollWithOffset = (el, offset) => {
    const elementPosition = el.offsetTop - offset;
    window.scroll({
      top: elementPosition,
      left: 0,
      behavior: "smooth"
    }); 
  }

export default ({data, menu}) => {
    if(!data) { return null }
    const featuredImage = setImg(data, 'medium_large')

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
                    <img src={featuredImage} alt="" />
                </span>
            </div>
        </section>
    )
}
