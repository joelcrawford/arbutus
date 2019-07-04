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
			if(state.pages.data.length === 0 && !state.pages.isFetching) { fetchWPData(dispatch, 'pages') }
			if(state.posts.data.length === 0 && !state.posts.isFetching) { fetchWPData(dispatch, 'posts') }
			if(state.videos.data.length === 0 && !state.videos.isFetching) { fetchWPData(dispatch, 'videos') }
			if(state.insta.data.length === 0 && !state.insta.isFetching) { fetchInsta(dispatch) }
		}

	}, 
		// dependency array
		[ 
			state.pages.isFetching,
			state.posts.isFetching,
			state.videos.isFetching,
			state.insta.isFetching,
			state.pages.data, 
			state.posts.data, 
			state.videos.data, 
			state.insta.data, 
			dispatch 
		]
	)

	//console.log(state)
	if(state.pages.data.length > 0) { hideLoader() } 

	// TRACE UPDATES TO STATE...
	//console.log(useTraceUpdate(state))
	//console.log(state)
	return (
		
		<div id="wrapper">
			<Home data={state.pages.data.find(p => p.slug === 'home')} menu={state.menu} />
			<About data={state.pages.data.find(p => p.slug === 'about')} />
			<Tour data={state.pages.data.find(p => p.slug === 'tour')} events={state.posts.data} />
			<Listen data={state.pages.data.find(p => p.slug === 'videos')} videos={state.videos.data} />
			<Gallery data={state.pages.data.find(p => p.slug === 'gallery')} insta={state.insta.data} />	
			<Contact data={state.pages.data.find(p => p.slug === 'contact')} />
			<Footer />
		</div>

  	)
}