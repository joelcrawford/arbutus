import React from 'react'
import '../assets/sass/main.scss'
import '../assets/sass/arbutus/arbutus.scss'

import Home from './Home'
import About from './About'
import Tour from './Tour'
import Gallery from './Gallery'
import Listen from './Listen'
import Contact from './Contact'
import Footer from './Footer'

import { Store } from '../store'
import { fetchPagesAction } from '../store/actions'



export default() => {
	
	const { state, dispatch } = React.useContext(Store)

	React.useEffect(() => {
		//console.log(state)
		state.pages.length === 0 && fetchPagesAction(dispatch)
		//state.posts.length === 0 && fetchPostsAction(dispatch)
	})
	
	return (
		<div id="wrapper">
			{ console.log(state) }
			<Home data={state.pages.find(p => p.slug === 'home')} menu={state.menu} anchor="home" />

			<About anchor="about" />
			<Tour anchor="tour" />
			<Listen anchor="listen" />
			<Gallery anchor="gallery" />	
			
			<Contact anchor="contact" />
			<Footer />
		</div>
  	)
}