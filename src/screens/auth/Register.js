import React, { useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import auth from "@react-native-firebase/auth"

import bg from "../../assets/images/bg.jpg"

const initialState = { email: "", password: "" }

export default function Register({ navigation }) {

    const { dispatch } = useAuthContext()

    const [state, setState] = useState(initialState)
    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }))

    }

    const handleRegister = () => {
        let { email, password } = state

        if (!email) return alert("Email is invalid")
        if (!password) return alert("Password is invalid")

        setIsProcessing(true)

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user

                dispatch({ type: "LOGIN", payload: { user } })
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            })
            .finally(() => {
                setIsProcessing(false)
            })
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
                    <Button mode="contained" color='white' loading={isProcessing} disabled={isProcessing} onPress={handleRegister}>
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