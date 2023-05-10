import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements'

const HomeStack = createStackNavigator();

export default HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name={"Trends"} 
                options={{
                    headerLeft: () => {
                        return (<Icon name='logo-twitter' type='ionicon' color={Colors.primaryBlue} size={30} containerStyle={{marginLeft: 20}} />)},
                    headerTitleAlign: 'center'
                }}
                component={HomeScreen} 
            />
        </HomeStack.Navigator>
    )
};