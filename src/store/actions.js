import * as types from './types'
const ip = 'http://157.230.145.18/arbutus/'
const wpRest = 'wp-json/wp/v2/'
const wpPages = 'pages?_embed'
const wpPosts = 'posts?_embed'
const wpVideos = 'videos'

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
const sort = (nestedObj, prop, arr) => {
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

const setUpMenu = (data) => {
    let menu = []
    data.map(m => {
        if(m.acf.featured) {
            menu.push({ slug: m.slug, title: m.acf.title, order: m.acf.pageorder })
        }
    })
    return menu.sort((a, b) => (a.order > b.order) ? 1 : -1)
}

export const fetchPages = async (dispatch) => {
    console.log('calling fetchpages')
    const controller = new AbortController()
    const signal = controller.signal
    setTimeout(() => controller.abort(), 5000) // this getting called is like user aborted
  
    try {

        const request = await fetch(`${ip}${wpRest}${wpPages}`, { signal })
        if(!request.ok) { throw Error(request.statusText) }
        const data = await request.json()
        const menu = setUpMenu(data)
        return dispatch({
            type: types.FETCH_PAGES,
            pages: data,
            menu
        })

    } catch(error) {
        
        return dispatch({
            type: types.FETCH_ERROR,
            error: true
        })

    }
    

}
   
export const fetchPosts = async (dispatch) => {
    console.log('calling fetchposts')
    const response = await fetch(`${ip}${wpRest}${wpPosts}`)
    const data = await response.json()
    sort('acf', 'eventdate', data) // sorts the array in place
    return dispatch({
        type: types.FETCH_POSTS,
        posts: data
    })
}

export const fetchVideos = async (dispatch) => {
    console.log('calling fetchvideos')
    const response = await fetch(`${ip}${wpRest}${wpVideos}`)
    const data = await response.json()
    sort('acf', 'videoorder', data) // sorts the array in place
    return dispatch({
        type: types.FETCH_VIDEOS,
        videos: data
    })
}