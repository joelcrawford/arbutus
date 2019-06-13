import React from 'react'
import img02 from './assets/images/pic02.jpg'

export default () => {
    return (
            <section id="first">
                <header>
                    <h2>Impossibly tight vocal harmonies</h2>
                </header>
                <div className="content">
                    <p>Arbutus is 
                    comprised of <strong>Madelyn and Savannah Read</strong>, a 
                    sister singer-songwriter duo from Vancouver, 
                    BC. They play a mixture of original compositions 
                    and innovative covers that span the genres of 
                    folk and alternative pop. They have been 
                    performing together for over 10 years 
                    (yes, since Savannah was 7 years old) and never 
                    fail to deliver impossibly tight sibling vocal 
                    harmonies. Normally, you can catch them playing 
                    at farmers markets and cafes around Vancouver, 
                    but this summer they’ll be touring their new EP 
                    (out August 2019) across the country. </p>
                    <span className="image main"><img src={img02} alt="" /></span>
                </div>
            </section>
    )
}