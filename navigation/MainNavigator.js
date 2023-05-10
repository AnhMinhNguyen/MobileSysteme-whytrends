import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from './HomeNavigator';
import SettingsNavigator from './SettingsNavigator';
import DetailsNavigator from './DetailsNavigator';
import { Ionicons } from '@expo/vector-icons';
import {
    DayTheme,
    NightTheme,
    getActiveIconTheme,
    getInactiveIconTheme
} from '../constants/Themes';
import { ThemeContext } from '../data/ThemeContext';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
    const [colorScheme, setColorScheme] = useContext(ThemeContext);
    return (
        <NavigationContainer theme={colorScheme === 'light' ? DayTheme : NightTheme}>
            <Tab.Navigator
                initialRouteName = "Trends"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Trends') {
                            if (Platform.OS === 'android') {
                                iconName = focused ? 'podium' : 'podium-outline';
                            } else if (Platform.OS === 'ios') {
                                iconName = focused ? 'ios-podium' : 'ios-podium-outline';
                            }
                        } else if (route.name === 'Settings') {
                            if (Platform.OS === 'android') {
                                iconName = focused ? 'md-options' : 'md-options-outline';
                            } else if (Platform.OS === 'ios') {
                                iconName = focused ? 'ios-options' : 'ios-options-outline';
                            }
                        } else if (route.name === 'Details') {
                            if (Platform.OS === 'android') {
                                iconName = focused ? 'md-bar-chart' : 'md-bar-chart-outline';
                            } else if (Platform.OS === 'ios') {
                                iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
                            }
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: getActiveIconTheme(colorScheme === 'light'),
                    inactiveTintColor: getInactiveIconTheme(colorScheme === 'light'),
                }}
            >
                <Tab.Screen name="Details" component={DetailsNavigator} />
                <Tab.Screen name="Trends" component={HomeNavigator} />
                <Tab.Screen name="Settings" component={SettingsNavigator} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}