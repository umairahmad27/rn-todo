import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/frontend/Home'

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Home />
        </NavigationContainer>
    )
}