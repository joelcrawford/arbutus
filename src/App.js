import React from 'react'
import './assets/sass/main.scss'
import './assets/sass/arbutus/arbutus.scss'

import Home from './Home'
import About from './About'
import Tour from './Tour'
import Gallery from './Gallery'
import Listen from './Listen'
import Contact from './Contact'
import Footer from './Footer'

export default() => {
	return (
		<div id="wrapper">

			<Home anchor="home" />

			<About anchor="about" />
			<Tour anchor="tour" />
			<Listen anchor="listen" />
			<Gallery anchor="gallery" />	
			
			<Contact anchor="contact" />
			<Footer />
		</div>
  	)
}