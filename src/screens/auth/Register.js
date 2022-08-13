import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import bg from "../../assets/images/bg.jpg"

const initialState = { email: "", password: "" }

export default function Register({ navigation }) {

    const { dispatch } = useAuthContext()

    const [state, setState] = useState(initialState)
    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))

    }

    const handleRegister = () => {
        let { email, password } = state

        console.log("email =>", email)
        console.log("password =>", password)

        dispatch({ type: "LOGIN" })
    }

    return (
        <ImageBackground source={bg} style={styles.container}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={[styles.textWhite, styles.h1]}>Register</Text>

                <View style={styles.row}>
                    <TextInput
                        label="Email"
                        value={state.email}
                        onChangeText={value => handleChange("email", value)}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.row}>
                    <TextInput
                        label="Password"
                        value={state.password}
                        onChangeText={value => handleChange("password", value)}
                        secureTextEntry={isPasswordShow ? false : true}
                        right={<TextInput.Icon name={isPasswordShow ? "eye" : "eye-off"} onPress={() => { setIsPasswordShow(!isPasswordShow) }} />}
                    />
                </View>
                <View style={styles.row}>
                    <Button mode="contained" color='white' onPress={handleRegister}>
                        Register
                    </Button>
                </View>
            </View>

            <View style={styles.row}>
                <Button color='white' onPress={() => { navigation.navigate("Login") }}>
                    Already have an account?
                </Button>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    flexContainer: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center"
    },
    h1: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center"
    },
    textWhite: {
        color: "white"
    },
    row: {
        marginBottom: 12
    }
})