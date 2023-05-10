import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/SettingsScreen';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements'

const SettingsStack = createStackNavigator();

export default SettingsNavigator = () => {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="Settings"
            options={{
                headerLeft: () => {
                    return (<Icon name='settings-outline' type='ionicon' color={Colors.primaryBlue} size={30} containerStyle={{marginLeft: 20}} />)},
                headerTitleAlign: 'center',
            }}
            component={SettingsScreen} />
        </SettingsStack.Navigator>
    )
};