import * as types from './types'
export function reducer(state, action) {
    switch (action.type) {
        case types.FETCH_PAGES:
            return { ...state, pages: action.payload.pages }
        case types.FETCH_MENU:
            return { ...state, menu: action.payload.menu }
        case types.FETCH_POSTS:
            return { ...state, posts: action.payload.posts }
        case types.FETCH_VIDEOS:
            return { ...state, videos: action.payload.videos }
        case types.FETCH_INSTA:
            return { ...state, insta: action.insta }
        case types.FETCH_ERROR:
            return { ...state, error: action.error }
        case types.REQUESTING_PAGES:
            return { ...state, isFetching: action.payload.isFetching }
        default:
            return state
    }
}

// need to figure out how selectors work, how to implement them
export const getPages = state => state.pages
export const getPosts = state => state.posts
export const getMenu = state => state.menu
