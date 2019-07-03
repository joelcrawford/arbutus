import { buildUrl } from 'react-instafeed'
import * as types from './types'
import { instaOptions } from './config'

const ip = 'http://157.230.145.18/arbutus/'
const wpRest = 'wp-json/wp/v2/'

const wpType = [
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

// arr is the array of objects, prop is the property to sort by
export const sort = (nestedObj, prop, arr) => {
    arr.sort((a, b) => {
        if (a[nestedObj][prop] < b[nestedObj][prop]) {
            return -1;
        } else if (a[nestedObj][prop] > b[nestedObj][prop]) {
            return 1;
        } else {
            return 0;
        }
    })
}

export const showOffline = () => {
    //const loaderText = document.querySelector('.loader-text')
    document.querySelector('.loader-text')
        .style.setProperty("--content", "'You are offline'")
    document.querySelector('.loader-text')
        .style.setProperty("--letter-spacing", 0)
    console.log('show offline')
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
        payload: { menu: menu.sort((a, b) => (a.order > b.order) ? 1 : -1) }
    })
}


export const fetchWPData = async (dispatch, type) => {
    console.log('fetching', type)
    const t = wpType.find(t => t.id === type)
    
    const actionName = `FETCH_${t.id.toUpperCase()}`

    const controller = new AbortController()
    const signal = controller.signal
    setTimeout(() => controller.abort(), 5000) // this getting called is like user aborted
    
    try {

        const request = await fetch(`${ip}${wpRest}${t.url}`, { signal })
        if(!request.ok) { throw Error(request.statusText) }
        const data = await request.json()
        
        if(t.id === 'pages') {
            
            setUpMenu(data, dispatch)
            return dispatch({
                type: types[actionName],
                payload: { [t.id]: data }
            })
            

        } else {
            return dispatch({
                type: types[actionName],
                payload: { [t.id]: data }
            })
        }
        

    } catch(error) {
        
        return dispatch({
            type: types.FETCH_ERROR,
            error: true
        })

    }
}

function filterHTTPErrors(notest, tested) {
    const vr = tested.filter(result => !(result instanceof Error))
    const m = notest.filter(n => {
        return vr.some(t => t.url === n.images.standard_resolution.url)
    })
    return m
}

export const fetchInsta = async (dispatch) => {
    console.log('fetching instagram')

    // setting up abort controller to timeout fetch if needed
    const controller = new AbortController()
    const signal = controller.signal
    //setTimeout(() => controller.abort(), 5000) // this getting called is like user aborted
    
    try {
        const request = await fetch(buildUrl(instaOptions), { signal })
        if(!request.ok) { throw Error(request.statusText) }
        const json = await request.json()
        //console.log(json.data)
        const r = await Promise.all(
            json.data.map(d => fetch(d.images.standard_resolution.url).catch((err) => err)))
        
        const testedItems = filterHTTPErrors(json.data, r)

        return dispatch({
            type: types.FETCH_INSTA,
            insta: testedItems
        })

    } catch(error) {
        return dispatch({
            type: types.FETCH_ERROR,
            error: true
        })
    }
}