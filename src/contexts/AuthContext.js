import React, { createContext, useContext, useReducer, useEffect } from 'react'
import auth from '@react-native-firebase/auth';


const AuthContext = createContext()

const initialState = { isAuthenticated: false }

const reducer = (state, { type, payload }) => {

    switch (type) {
        case "LOGIN":
            return Object.assign({}, { isAuthenticated: true }, { user: payload.user })
        case "LOGOUT":
            return Object.assign({}, { isAuthenticated: false })
        default:
            return state
    }

}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {

            dispatch({ type: "LOGIN", payload: { user } })
            // console.log(user)
        });
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}