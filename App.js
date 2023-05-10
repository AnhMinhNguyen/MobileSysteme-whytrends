import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { ThemeContext } from './data/ThemeContext';
import { SearchContext } from './data/SearchContext';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  let [fontsLoaded] = useFonts({
    "arial": require("./assets/fonts/arial.ttf"),
    "arial-bold": require("./assets/fonts/arialbd.ttf"),
    "arial-italic": require("./assets/fonts/ariali.ttf"),
  });
  const [colorScheme, setColorScheme] = useState('light');
  const [clickedTrend, setClickedTrend] = useState('');

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SearchContext.Provider value={[clickedTrend, setClickedTrend]}>
        <ThemeContext.Provider value={[colorScheme, setColorScheme]}>
          <MainNavigator />
        </ThemeContext.Provider>
      </SearchContext.Provider>
    );
  }
}