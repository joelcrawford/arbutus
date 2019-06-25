import React from 'react'
import { reducer } from './reducers'

export const Store = React.createContext()

const initialState = {
    pages: [], 
    posts: [],
    menu: []
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    const value = { state, dispatch }

    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    )
    
  }