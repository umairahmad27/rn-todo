import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/frontend/Home'
import Login from '../screens/auth/Login';
import { useAuthContext } from '../contexts/AuthContext';
import Register from '../screens/auth/Register';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const { isAuthenticated } = useAuthContext()

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!isAuthenticated
                    ? <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='Login' component={Login} />
                        <Stack.Screen name='Register' component={Register} />
                    </Stack.Group>
                    : <Stack.Group>
                        <Stack.Screen name='Home' component={Home} />
                    </Stack.Group>
                }
            </Stack.Navigator>

        </NavigationContainer>
    )
}