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

import Loader from './Loader'

import { Store } from '../store'
import { fetchPages, fetchPosts, fetchVideos } from '../store/actions'

export default() => {
	
	const { state, dispatch } = React.useContext(Store)

	React.useEffect(() => {
		console.log(state)
		state.pages.length === 0 && fetchPages(dispatch)
		state.posts.length === 0 && fetchPosts(dispatch)
		state.videos.length === 0 && fetchVideos(dispatch)
	})

	if(!state.pages || !state.posts || !state.videos) { return <Loader /> }

	return (
		
		<div id="wrapper">

			<Home data={state.pages.find(p => p.slug === 'home')} menu={state.menu} />

			<About data={state.pages.find(p => p.slug === 'about')} />
			<Tour data={state.pages.find(p => p.slug === 'tour')} events={state.posts} />
			<Listen data={state.pages.find(p => p.slug === 'videos')} videos={state.videos} />
			<Gallery anchor="gallery" />	
			
			<Contact data={state.pages.find(p => p.slug === 'contact')} />
			<Footer />
		</div>
  	)
}