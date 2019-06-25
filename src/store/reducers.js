export const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_PAGES':
            return { ...state, pages: action.pages, menu: action.menu }
        default:
            return state
    }
}
