import React from 'react'
import '../assets/sass/arbutus/listen.scss'

const data = {
    anchor: 'listen',
    title: 'Listen',
    content: `<strong>Have a listen on Youtube</strong>`,
    youTubeIDs: [
        {id: 'e_q36_AZXos', title: 'The Game', desc: 'A little ditty about stuff and things...'},
        {id: 'DZ15MeuGuYw', title: '5 Days in May', desc: 'Another ditty about 5 days that happened in the month of May...'}
    ]
}

const YouTube = ({video, autoplay, rel, modest}) => {
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
}

export default ({data, videos}) => {
    if(!data || !videos) { return null }
    return (
        <section id={data.slug}>
            <header>
                <h2>{data.acf.title}</h2>
            </header>
            <div className="content">
                <p dangerouslySetInnerHTML={{__html: data.content.rendered}} />
                
                    {videos.map((vid, i) => {
                        console.log(vid)
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
}
