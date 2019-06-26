const ip = 'http://157.230.145.18/arbutus/'
const wpRest = 'wp-json/wp/v2/'
const wpPages = 'pages?_embed'
const wpPosts = 'posts?_embed'

const imgSizes = ['full', 'small', 'medium', 'medium_large']

export const bestFalIcons = [ 
    'acorn', 'alicorn', 'award', 'crow', 'dagger', 'dice-d10', 'dove', 
    'eye', 'fire', 'gem', 'kiss-wink-heart', 'ice-cream', 'socks', 'spa']

export const formatDateString = `dddd, MMMM Do YYYY, h:mm:ss a`

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

// const sort = (prop, arr) => {
//     prop = prop.split('.');
//     var len = prop.length;

//     arr.sort(function (a, b) {
//         console.log(a, b, prop)
//         var i = 0;
//         while( i < len ) { 
//             a = a[prop[i]]; b = b[prop[i]]; i++; 
//         }
//         console.log(a, b)
//         if (a < b) {
//             return -1;
//         } else if (a > b) {
//             return 1;
//         } else {
//             return 0;
//         }
//     })
//     return arr
// }

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
    sort('acf', 'eventdate', dataJSON)
    return dispatch({
        type: 'FETCH_POSTS',
        posts: dataJSON
    })
}
