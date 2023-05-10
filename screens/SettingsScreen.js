import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Switch
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';

import Colors from '../constants/Colors';
import LayoutStyles from '../constants/LayoutStyles';
import SettingsText from '../components/SettingsText';
import {
    getTextTheme,
    getBackgroundTheme
} from '../constants/Themes';
import { ThemeContext } from '../data/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default SettingsScreen = props => {
    const { height } = useDimensions().window;
    const [colorScheme, setColorScheme] = useContext(ThemeContext);
    const tabBarHeight = useBottomTabBarHeight();
    const adjustedHeight = height - (2 * tabBarHeight);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
    };

    return (
        <View style={Platform.select({ ios: styles.wrapperIOS, android: { height: adjustedHeight } })}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <View style={{ height: adjustedHeight }} backgroundColor={getBackgroundTheme(colorScheme === 'light')}>
                    <View style={LayoutStyles.mainContainer}>
                        <View style={LayoutStyles.contentContainer}>
                            <View style={{flexDirection: 'row', paddingHorizontal: 40, paddingVertical: 30, justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <SettingsText style={{color: getTextTheme(colorScheme === "light")}}>Dark Mode</SettingsText>
                                <Switch
                                    trackColor={{ false: Colors.secondaryLightGray, true: Colors.secondaryDarkGray }}
                                    thumbColor={isEnabled ? Colors.primaryBlue : Colors.secondaryExtraLightGray}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                        </View>
                        <StatusBar style= {colorScheme === 'light' ? 'dark' : 'light'} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapperIOS: {
        height: '100%'
    },
});