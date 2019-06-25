const ip = 'http://157.230.145.18/arbutus/'
const wpRest = 'wp-json/wp/v2/'
const wpPages = 'pages?_embed'
const wpPosts = 'posts?_embed'

const imgSizes = ['full', 'small', 'medium', 'medium_large']

export const setImg = (data, size) => {
    let img = null
    if(!imgSizes.includes(size)) { size = 'medium_large' }
    if(!!data._embedded['wp:featuredmedia'][0]) {
        img = data._embedded['wp:featuredmedia'][0].media_details.sizes[size].source_url
    }
    return img
}

const setUpMenu = async (data) => {
    let menu = []
    data.map(m => {
        if(m.acf.featured) {
            menu.push({ slug: m.slug, title: m.acf.title, order: m.acf.pageorder })
        }
    })
    return menu.sort((a, b) => (a.order > b.order) ? 1 : -1)
}

export const fetchPages = async (dispatch) => {
    const data = await fetch(`${ip}${wpRest}${wpPages}`)
    const dataJSON = await data.json()
    const menu = await setUpMenu(dataJSON)
    return dispatch({
        type: 'FETCH_PAGES',
        pages: dataJSON, 
        menu: menu
    })
}

export const fetchPosts = async (dispatch) => {
    const data = await fetch(`${ip}${wpRest}${wpPosts}`)
    const dataJSON = await data.json()
    return dispatch({
        type: 'FETCH_POSTS',
        posts: dataJSON
    })
}
