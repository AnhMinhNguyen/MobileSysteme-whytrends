import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../screens/DetailsScreen';
import Colors from '../constants/Colors';
import { Icon } from 'react-native-elements'

const DetailsStack = createStackNavigator();

export default DetailsNavigator = () => {
    return (
        <DetailsStack.Navigator>
            <DetailsStack.Screen name="Details"
            options={{
                headerLeft: () => {
                    return (<Icon name='analytics-outline' type='ionicon' color={Colors.primaryBlue} size={30} containerStyle={{marginLeft: 20}} />)},
                headerTitleAlign: 'center'
            }}
            component={DetailsScreen} />
        </DetailsStack.Navigator>
    )
};