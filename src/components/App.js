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
import { fetchPages, fetchPosts } from '../store/actions'
import { getPages } from '../store/reducers'



export default() => {
	
	const { state, dispatch } = React.useContext(Store)

	React.useEffect(() => {
		//console.log(state)
		state.pages.length === 0 && fetchPages(dispatch)
		state.posts.length === 0 && fetchPosts(dispatch)
	})

	return (
		<div id="wrapper">
			<Home data={state.pages.find(p => p.slug === 'home')} menu={state.menu} />

			<About data={state.pages.find(p => p.slug === 'about')} />
			<Tour data={state.pages.find(p => p.slug === 'tour')} events={state.posts} />
			<Listen anchor="listen" />
			<Gallery anchor="gallery" />	
			
			<Contact anchor="contact" />
			<Footer />
		</div>
  	)
}