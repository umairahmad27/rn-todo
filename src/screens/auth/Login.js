import React from 'react'
// import { useAuthContext } from '../../contexts/AuthContext'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

import bg from "../../assets/images/bg.jpg"

export default function Login() {

    // const { dispatch } = useAuthContext()

    return (
        <ImageBackground source={bg} style={styles.flexContainer}>
            <Text style={[styles.textWhite, styles.h1]}>Login</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    h1: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 16
    },
    textWhite: {
        color: "white"
    }
})