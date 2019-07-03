import React, { useContext, useEffect } from 'react'
import { Store } from '../store'

import Home from './Home'
import About from './About'
import Tour from './Tour'
import Gallery from './Gallery'
import Listen from './Listen'
import Contact from './Contact'
import Footer from './Footer'

import { fetchWPData, hideLoader, showOffline, fetchInsta } from '../store/actions'
//import useTraceUpdate from './hooks/useTraceUpdate'

import '../assets/sass/main.scss'
import '../assets/sass/arbutus/loader.scss'
import '../assets/sass/arbutus/arbutus.scss'

export default() => {

	const { state, dispatch } = useContext(Store)

	useEffect(() => {
		
		if(!navigator.onLine) { 
			showOffline()
		} else {
			// create isLoading state to handle when length = 0 but fetch already called
			
			if(state.pages.length === 0) { fetchWPData(dispatch, 'pages') }
			if(state.posts.length === 0) { fetchWPData(dispatch, 'posts') }
			if(state.videos.length === 0) { fetchWPData(dispatch, 'videos') }
			if(state.insta.length === 0) { fetchInsta(dispatch) }
			
		}

	}, 
		// dependency array
		[ 
			state.pages.length, 
			state.posts.length, 
			state.videos.length, 
			state.insta.length, 
			dispatch 
		]
	)

	if(state.pages.length > 0) { hideLoader() } 

	// TRACE UPDATES TO STATE...
	//console.log(useTraceUpdate(state))
	
	return (
		
		<div id="wrapper">
			<Home data={state.pages.find(p => p.slug === 'home')} menu={state.menu} />
			<About data={state.pages.find(p => p.slug === 'about')} />
			<Tour data={state.pages.find(p => p.slug === 'tour')} events={state.posts} />
			<Listen data={state.pages.find(p => p.slug === 'videos')} videos={state.videos} />
			<Gallery data={state.pages.find(p => p.slug === 'gallery')} insta={state.insta} />	
			<Contact data={state.pages.find(p => p.slug === 'contact')} />
			<Footer />
		</div>

  	)
}