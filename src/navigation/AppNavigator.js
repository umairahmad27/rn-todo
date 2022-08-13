import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/frontend/Home'
import Login from '../screens/auth/Login';
import { useAuthContext } from '../contexts/AuthContext';
import Register from '../screens/auth/Register';
import { Button } from 'react-native';
import auth from "@react-native-firebase/auth"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const { isAuthenticated, dispatch } = useAuthContext()

    const handleLogout = () => {
        auth().signOut()
            .then(() => {
                dispatch({ type: "LOGOUT" })
            })
            .catch((err) => {
                console.error(err)
                alert("Something went wrong")
            })
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Register'>
                {!isAuthenticated
                    ? <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='Register' component={Register} />
                    </Stack.Group>
                    : <Stack.Group screenOptions={{
                        headerRight: () => { return <Button title='Logout' onPress={handleLogout} /> }
                    }}>
                        <Stack.Screen name='Home' component={Home} />
                    </Stack.Group>
                }
            </Stack.Navigator>

        </NavigationContainer>
    )
}