const ip = 'http://157.230.145.18/arbutus/'
const wpRest = 'wp-json/wp/v2/'
const wpPages = 'pages?_embed'

const setUpMenu = async (data) => {
    let menu = []
    data.map(m => {
        if(m.acf.featured) {
            menu.push({ slug: m.slug, title: m.acf.title, order: m.acf.pageorder })
        }
        
    })
    return menu
}

export const fetchPagesAction = async (dispatch) => {
    const data = await fetch(`${ip}${wpRest}${wpPages}`)
    console.log(data)
    const dataJSON = await data.json()
    const menu = await setUpMenu(dataJSON)
    return dispatch({
        type: 'FETCH_PAGES',
        pages: dataJSON, 
        menu: menu
    })
}
