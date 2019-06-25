import * as types from './types'
export const reducer = (state, action) => {
    switch (action.type) {
        case types.FETCH_PAGES:
            return { ...state, pages: action.pages, menu: action.menu }
        case types.FETCH_POSTS:
            return { ...state, posts: action.posts }
        default:
            return state
    }
}
