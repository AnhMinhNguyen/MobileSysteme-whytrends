import { StatusBar } from 'expo-status-bar';
import { LineChart } from "react-native-chart-kit";
import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useDimensions } from "@react-native-community/hooks";
import Colors from '../constants/Colors';
import LayoutStyles from '../constants/LayoutStyles';
import DescriptionText from '../components/DescriptionText';
import TrendEntry from '../components/TrendEntry';
import {
    getTextTheme,
    getDescriptionTextTheme,
    getBackgroundTheme,
    getTrendEntryTheme
} from '../constants/Themes';
import { ThemeContext } from '../data/ThemeContext';
import { SearchContext } from '../data/SearchContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';

export default DetailsScreen = ({ navigation }) => {
    const { height } = useDimensions().window;
    const [colorScheme, setColorScheme] = useContext(ThemeContext);
    const tabBarHeight = useBottomTabBarHeight();
    const adjustedHeight = height - (2 * tabBarHeight);
    const [clickedTrend, setClickedTrend] = useContext(SearchContext);
    const bearertoken = "AAAAAAAAAAAAAAAAAAAAAE2UQAEAAAAAI56uZn87XTrU8W%2B%2FD18LuwGovFs%3Dd2sVdcbIlmPEjRTzlADj2WqgiUn4RBJqJPU1flf47jcHG6A4do";
    const url_search = "https://api.twitter.com/1.1/search/tweets.json?q=";
    const [searchText, setSearchText] = useState("");
    const [textData, setTextData] = useState("")
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    //dummy data
    const data = {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
        datasets: [
            {
                data: [1, 45, 30, 60, 85, 80, 100],
                color: (opacity = 1) => `rgba(29, 161, 242, ${opacity})`, // optional
                strokeWidth: 4 // optional
            }
        ],
        legend: ["Trend Milestone"] // optional
    };

    useEffect(() => {
        setSearchText(clickedTrend);
        searchHandler();
    }, [clickedTrend]);

    const searchHandler = async () => {
        setIsInitialLoading(false);
        setIsLoading(true);

        if (clickedTrend === "") {
            return;
        }

        if (clickedTrend.startsWith("#")) {
            setClickedTrend(clickedTrend.replace('#', '%23'));
            return;
        }

        try {
            let response = await fetch(url_search + clickedTrend, {
                headers: {
                    'Authorization': "bearer " + bearertoken
                }
            });
            response = await response.json();
            setTextData(response)
        } catch (err) {
            console.log('err', err);
        }
        setIsLoading(false);
    };

    const checkHashtag = (entry) => {
        if (entry.startsWith("#")) {
            entry = entry.replace('#', '%23');
        }
        return entry;
    };

    return (
        <View style={Platform.select({ ios: styles.wrapperIOS, android: { height: adjustedHeight } })}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <View style={{ height: adjustedHeight }} backgroundColor={getBackgroundTheme(colorScheme === 'light')}>
                    <View style={LayoutStyles.topContainer}>
                        <SearchBar
                            placeholder="enter trend..."
                            selectionColor={Colors.primaryBlue}
                            placeholderTextColor={getDescriptionTextTheme(colorScheme === 'light')}
                            inputStyle={{
                                color: Colors.primaryBlue,
                                fontFamily: 'arial-italic'
                            }}
                            containerStyle={styles.searchBar}
                            inputContainerStyle={{
                                backgroundColor: getBackgroundTheme(colorScheme === 'light'),
                                paddingHorizontal: 10
                            }}
                            autoCorrect={false}
                            value={searchText.startsWith('%23') ? searchText.replace('%23', '#') : searchText}
                            onChangeText={(val) => {
                                setSearchText(val);
                            }}
                            onClear={() => {
                                Keyboard.dismiss();
                            }}
                            lightTheme={colorScheme === 'light'}
                            round={true}
                            onSubmitEditing={() => {
                                setClickedTrend(checkHashtag(searchText));
                            }}
                        />
                    </View>
                    <View style={LayoutStyles.mainContainer}>
                    {isInitialLoading ? (
                            <View>
                                <Text>Loading...</Text>
                            </View>
                        ) : isLoading ? (
                            <ActivityIndicator style={{ marginTop: 50 }} size="large" color={Colors.primaryBlue}/>
                        ) : (
                        <ScrollView>
                            <TouchableOpacity activeOpacity={1}>
                                <View style={LayoutStyles.dataContainer, { paddingVertical: 20, alignItems: 'center', paddingTop: 0 }}>
                                    <DescriptionText style={{ color: getDescriptionTextTheme(colorScheme === 'light') }}>TREND TIMELINE OVER THE PAST 7 DAYS</DescriptionText>
                                    <LineChart
                                        data={data}
                                        width={290}
                                        height={140}
                                        verticalLabelRotation={0}
                                        segments={2}
                                        fromZero={true}
                                        yAxisSuffix={"m"}
                                        xLabelsOffset={-10}
                                        chartConfig={{
                                            backgroundGradientFrom: Colors.secondaryBlack,
                                            backgroundGradientTo: Colors.secondaryBlack,
                                            fillShadowGradient: Colors.primaryBlue,
                                            decimalPlaces: 0, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(245, 248, 250, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(245, 248, 250, ${opacity})`,
                                            propsForDots: {
                                                fill: Colors.primaryBlue,
                                                r: "7",
                                                strokeWidth: "1",
                                                stroke: Colors.primaryBlue
                                            }
                                        }}
                                        bezier
                                        style={{
                                            borderRadius: 20,
                                        }}
                                    />
                                </View>
                                <View style={LayoutStyles.contentContainer}>
                                    <DescriptionText style={{ color: getDescriptionTextTheme(colorScheme === 'light') }}>MOST RECENT TWEETS</DescriptionText>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[0].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[1].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[2].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[3].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[4].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[5].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[6].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[7].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[8].text}</TrendEntry>
                                    <TrendEntry theme={{backgroundColor: getTrendEntryTheme(colorScheme === 'light')}} style={{color: getTextTheme(colorScheme === 'light')}}>{textData.statuses[9].text}</TrendEntry>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>)}
                        <StatusBar style={colorScheme === 'light' ? 'dark' : 'light'} />
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
    searchBar: {
        flex: 1,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        width: '100%'
    },
    inputStyle: {
        color: Colors.primaryBlue,
        fontFamily: 'arial-italic'
    },
});