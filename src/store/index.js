import React, { createContext, useReducer } from 'react'
import { reducer } from './reducers'

export const Store = createContext()

const initialState = {
    pages: { data: [], isFetching: false }, 
    posts: { data: [], isFetching: false },
    videos: { data: [], isFetching: false },
    insta: { data: [], isFetching: false },
    menu: [],
    isError: false
}

export function StoreProvider(props) {
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch }

    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    )  

}