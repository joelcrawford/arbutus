import * as types from './types'
export function reducer(state, action) {
    switch (action.type) {
        case types.FETCH_PAGES:
            return { ...state, pages: action.pages, menu: action.menu }
        case types.FETCH_POSTS:
            return { ...state, posts: action.posts }
        case types.FETCH_VIDEOS:
            return { ...state, videos: action.videos }
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
