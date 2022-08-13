import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/frontend/Home'
import Login from '../screens/auth/Login';

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Login />
        </NavigationContainer>
    )
}