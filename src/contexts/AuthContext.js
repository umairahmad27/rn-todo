import React, { createContext, useContext, useReducer } from 'react'


const AuthContext = createContext()

const initialState = { isAuthenticated: false }

const reducer = (state, { type }) => {

    switch (type) {
        case "LOGIN":
            return Object.assign({}, { isAuthenticated: true }, { user: { email: "m.umairahmad1@gmail.com" } })
        case "LOGOUT":
            return Object.assign({}, { isAuthenticated: false })
        default:
            return state
    }

}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}