import React from 'react'
import { Store } from '../store'

import Home from './Home'
import About from './About'
import Tour from './Tour'
import Gallery from './Gallery'
import Listen from './Listen'
import Contact from './Contact'
import Footer from './Footer'

import { fetchPages, fetchPosts, fetchVideos } from '../store/actions'

import '../assets/sass/main.scss'
import '../assets/sass/arbutus/arbutus.scss'

const loader = document.querySelector('.loader-container')

const hideLoader = () => {
	setTimeout(() => {
		loader.classList.add('loader-container--hide')
	}, 1000)
	
}

const showLoader = () => loader.classList.remove('loader-container--hide')
	
const App = () => {

	


	const { state, dispatch } = React.useContext(Store)

	//React.useEffect(() => hideLoader(), [hideLoader])
	React.useEffect(() => hideLoader());

	React.useEffect(() => {
		//console.log(state)
		state.pages.length === 0 && fetchPages(dispatch)
		state.posts.length === 0 && fetchPosts(dispatch)
		state.videos.length === 0 && fetchVideos(dispatch)
	})

	if(!state.pages || !state.posts || !state.videos) { return null }
		
	return (
		
		<div id="wrapper">
			<Home data={state.pages.find(p => p.slug === 'home')} menu={state.menu} />

			<About data={state.pages.find(p => p.slug === 'about')} />
			<Tour data={state.pages.find(p => p.slug === 'tour')} events={state.posts} />
			<Listen data={state.pages.find(p => p.slug === 'videos')} videos={state.videos} />
			<Gallery data={state.pages.find(p => p.slug === 'gallery')} />	
			
			<Contact data={state.pages.find(p => p.slug === 'contact')} />
			<Footer />
		</div>
  	)
}

export default App