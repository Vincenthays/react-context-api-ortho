import React, { createContext, useReducer } from 'react'
import reducer, { initValue } from '../reducers/mainReducer';

export const MainContext = createContext()

export function MainProvider({ children }) {
    const value = useReducer(reducer, initValue)
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}
