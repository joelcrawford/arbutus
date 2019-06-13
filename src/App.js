import React from 'react'
import './assets/sass/main.scss'


import Home from './Home'
import Page from './Page'
import Tour from './Tour'
import Gallery from './Gallery'
import CTA from './CTA'
import Contact from './Contact'
import Footer from './Footer'

import './assets/sass/arbutus.scss'

function App() {
  return (
    <div id="wrapper">
		<Home />

		<Page />
		<Tour />
		<CTA />
		<Gallery />	

		
						
		<Contact />
		<Footer />
	</div>
  )
}

export default App;
