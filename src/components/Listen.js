import React from 'react'
import '../assets/sass/arbutus/listen.scss'

const YouTube = React.memo(({video, autoplay, rel, modest}) => {
    const videoSrc = "https://www.youtube.com/embed/" + 
        video + 
        "?autoplay=" + autoplay + 
        "&rel=" + rel + 
        "&modestbranding=" + modest
    return (
        <div className="container">
            <iframe
                title={video}
                className="player" 
                type="text/html" 
                width="100%" 
                //height="100%"
                src={videoSrc}
                frameBorder="0"/>
        </div> 
    )
})

export default React.memo(({data, videos}) => {
    if(!data || !videos) { return null }
    return (
        <section id={data.slug}>
            <header>
                <h2>{data.acf.title}</h2>
            </header>
            <div className="content">
                <p dangerouslySetInnerHTML={{__html: data.content.rendered}} />
                
                    {videos.map((vid, i) => {
                        return (
                            <div key={i} className="youtube-container">
                                <h3>{vid.acf.title}</h3>
                                <p>{vid.acf.description}</p>
                                <YouTube 
                                    key={i}
                                    video={vid.acf.videoid}
                                    autoplay="0" rel="0" modest="1"
                                />
                            </div>   
                        )
                    })}
            </div>
        </section>
    )
})
