import React from 'react'
import { setImg } from '../store/actions'

export default React.memo(({data}) => {
    
    if(!data) { return null }
    const featuredImage = setImg(data, 'medium')

    return (
            <section id={data.slug}>
                <header>
                    <h2>{data.acf.title}</h2>
                </header>
                <div className="content">
                    <p dangerouslySetInnerHTML={{__html: data.content.rendered}} />
                    <span className="image main"><img src={featuredImage} alt="" /></span>
                </div>
            </section>
    )
})