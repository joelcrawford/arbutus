import { buildUrl } from 'react-instafeed'
import * as types from './types'
import { instaArbutus } from './config'

const ip = 'http://157.230.145.18/arbutus/'
const wpRest = 'wp-json/wp/v2/'

const wpPostTypes = [
    { id: 'pages', url: 'pages?_embed' },
    { id: 'posts', url: 'posts?_embed'},
    { id: 'videos', url: 'videos' }
]

const wpImgSizes = ['full', 'small', 'medium', 'medium_large']

export const bestFalIcons = [ 
    'acorn', 'alicorn', 'award', 'crow', 'dagger', 'dice-d10', 'dove', 
    'eye', 'fire', 'gem', 'kiss-wink-heart', 'ice-cream', 'socks', 'spa']

export const formatDateString = `dddd, <b>MMMM Do</b> YYYY @ h:mm a`

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sortByNested(prop, arr) {
    prop = prop.split('.')
    var len = prop.length

    arr.sort(function (a, b) {
        let i = 0
        while( i < len ) { a = a[prop[i]]; b = b[prop[i]]; i++; }
        if (a < b) {
            return -1
        } else if (a > b) {
            return 1
        } else {
            return 0
        }
    })
    return arr
}

export const alterWelcomeScreen = (type) => {
    if(type === 'offline') {
        document.querySelector('.loader-text')
            .style.setProperty("--content", "'You are offline'")
        document.querySelector('.loader-text')
            .style.setProperty("--letter-spacing", 0)
        console.log('offline')
    } else if(type === 'error') {
        document.querySelector('.loader-text')
            .style.setProperty("--content", "'Error")
        document.querySelector('.loader-text')
            .style.setProperty("--letter-spacing", 0)
        console.log('error')
    }
    
}

export const hideLoader = () => {

    const timer = 800
    const loader = document.querySelector('.loader-container')

    document.getElementById('root').classList.remove('hide-root')

    setTimeout(() => {
    
        loader.classList.add('loader-container--hide')
        
    }, timer)
    
}

export const setImg = (data, size) => {
    let img = null
    if(!wpImgSizes.includes(size)) { size = 'medium_large' }
    if(!!data._embedded['wp:featuredmedia'][0]) {
        img = data._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url
    }
    return img
}

const setUpMenu = (data, dispatch) => {
    let menu = []
    data.map(m => {
        if(m.acf.featured) {
            menu.push({ slug: m.slug, title: m.acf.title, order: m.acf.pageorder })
        }
    })
    return dispatch({
        type: types.FETCH_MENU,
        payload: menu.sort((a, b) => (a.order > b.order) ? 1 : -1)
    })
}


export const fetchWPData = async (dispatch, type) => {
    
    const t = wpPostTypes.find(t => t.id === type)
    
    const actionName = `FETCH_${t.id.toUpperCase()}`
    const reqName = `REQUEST_${t.id.toUpperCase()}`

    const controller = new AbortController()
    const signal = controller.signal
    setTimeout(() => controller.abort(), 5000) // this getting called is like user aborted
    
    dispatch({type: types[reqName]})
    
    try {

        const request = await fetch(`${ip}${wpRest}${t.url}`, { signal })
        //console.log(request.ok)
        if(!request.ok) { throw Error(request.statusText) }
        const data = await request.json()
        
        if(t.id === 'pages') { setUpMenu(data, dispatch) }
        return dispatch({
            type: types[actionName],
            payload: data
        })

    } catch(error) {
        console.log('error', error)
        //alterWelcomeScreen('error')
        //return dispatch({type: types.FETCH_PAGES_ERROR})
    }
}

function abortableFetch(request, opts) {
    const controller = new AbortController()
    const signal = controller.signal
    setTimeout(() => controller.abort(), 5000)
  
    return {
        abort: () => controller.abort(),
        ready: fetch(request, { ...opts, signal })
    }
}

export const fetchWPPages = async (dispatch) => {
    const wpPages = 'pages?_embed'
    dispatch({type: types.REQUEST_PAGES})

    try {

        const request = await abortableFetch(`${ip}${wpRest}${wpPages}`)
        const response = await request.ready 

        if(response.status !== 200) { throw new Error(response.status) } 
        
        let data = await response.json()
        setUpMenu(data, dispatch)
        return dispatch({
            type: types.FETCH_PAGES,
            payload: data
        })
     
    } catch(error) {
        alterWelcomeScreen('error')
        return dispatch({type: types.FETCH_PAGES_ERROR})
    }
}

function filterHTTPErrors(noTest, tested) {
    const filtered = tested.filter(result => !(result instanceof Error))
    const dataset = noTest.filter(n => {
        return filtered.some(t => t.url === n.images[instaArbutus.resolution].url)
    })

    if(filtered.length !== dataset.length) { console.log(filtered, dataset) }
    
    return dataset
}

export const fetchInsta = async (dispatch) => {
    
    // setting up abort controller to timeout fetch if needed
    const controller = new AbortController()
    const signal = controller.signal
    setTimeout(() => controller.abort(), 5000) // this getting called is like user aborted
    
    dispatch({type: types.REQUEST_INSTA})
    
    try {
        const request = await fetch(buildUrl(instaArbutus), { signal })
        if(!request.ok) { throw Error(request.statusText) }
        const json = await request.json()
        const flaggedData = await Promise.all(
            json.data.map(d => fetch(d.images[instaArbutus.resolution].url).catch((err) => err)))
        
        const testedItems = filterHTTPErrors(json.data, flaggedData)

        return dispatch({
            type: types.FETCH_INSTA,
            payload: testedItems
        })

    } catch(error) {
        // return dispatch({
        //     type: types.FETCH_ERROR,
        //     isError: true
        // })
    }
}