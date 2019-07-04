import * as types from './types'
export function reducer(state, action) {
    switch (action.type) {

        case types.FETCH_PAGES:
            return {
                ...state, 
                pages: Object.assign({}, state.pages, { data: action.payload, isFetching: false })
            }

        case types.FETCH_POSTS:
            return { 
                ...state, 
                posts: Object.assign({}, state.posts, { data: action.payload, isFetching: false })
            }

        case types.FETCH_VIDEOS:
            return { 
                ...state, 
                videos: Object.assign({}, state.videos, { data: action.payload, isFetching: false })
            }
        case types.FETCH_INSTA:
            return { 
                ...state, 
                insta: Object.assign({}, state.insta, { data: action.payload, isFetching: false }) 
            }
        
        case types.FETCH_MENU:
            return { ...state, menu: action.payload }
    
        case types.REQUEST_PAGES:
            return { ...state, pages: Object.assign({}, state.pages, { isFetching: true })}
        case types.REQUEST_POSTS:
            return { ...state, posts: Object.assign({}, state.posts, { isFetching: true })}
        case types.REQUEST_VIDEOS:
            return { ...state, videos: Object.assign({}, state.videos, { isFetching: true })}
        case types.REQUEST_INSTA:
                return { ...state, insta: Object.assign({}, state.insta, { isFetching: true })}  

        case types.FETCH_ERROR:
            return { ...state, error: action.error }
            
        default:
            return state

    }
}

// need to figure out how selectors work, how to implement them
export const getPages = state => state.pages
export const getPosts = state => state.posts
export const getMenu = state => state.menu
