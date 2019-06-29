import React, { useContext, useEffect } from 'react'
import { Store } from '../store'

import Home from './Home'
import About from './About'
import Tour from './Tour'
import Gallery from './Gallery'
import Listen from './Listen'
import Contact from './Contact'
import Footer from './Footer'

import { fetchWPData, hideLoader, showOffline } from '../store/actions'
//import useTraceUpdate from './hooks/useTraceUpdate'

import '../assets/sass/main.scss'
import '../assets/sass/arbutus/loader.scss'
import '../assets/sass/arbutus/arbutus.scss'

const App = () => {

	const { state, dispatch } = useContext(Store)

	useEffect(() => {
		
		if(!navigator.onLine) { 
			showOffline()
		} else {
			
			state.pages.length === 0 && fetchWPData(dispatch, 'pages')
			state.posts.length === 0 && fetchWPData(dispatch, 'posts')
			state.videos.length === 0 && fetchWPData(dispatch, 'videos')
			
		}

	}, [state]) //[state.pages, state.posts, state.videos]

	if(state.pages.length > 0) { hideLoader() } 

	// TRACE UPDATES TO STATE...
	//console.log(useTraceUpdate(state.pages))

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