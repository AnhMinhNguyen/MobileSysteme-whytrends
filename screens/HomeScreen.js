import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useDimensions } from "@react-native-community/hooks";
import { Picker } from "@react-native-community/picker";
import Colors from '../constants/Colors';
import LayoutStyles from '../constants/LayoutStyles';
import DefaultText from "../components/DefaultText";
import DescriptionText from "../components/DescriptionText";
import TrendButton from '../components/TrendButton';
import {
    getTextTheme,
    getDescriptionTextTheme,
    getBackgroundTheme,
    getPickerTextTheme
} from '../constants/Themes';
import { ThemeContext } from '../data/ThemeContext';
import { SearchContext } from '../data/SearchContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default HomeScreen = ({ navigation }) => {
    const { height, width } = useDimensions().window;
    const [colorScheme, setColorScheme] = useContext(ThemeContext);
    const tabBarHeight = useBottomTabBarHeight();
    const adjustedHeight = height - (2.2 * tabBarHeight);
    const [clickedTrend, setClickedTrend] = useContext(SearchContext);
    
    //Api
    const bearertoken = "AAAAAAAAAAAAAAAAAAAAAE2UQAEAAAAAI56uZn87XTrU8W%2B%2FD18LuwGovFs%3Dd2sVdcbIlmPEjRTzlADj2WqgiUn4RBJqJPU1flf47jcHG6A4do";
    const url_trend = "https://api.twitter.com/1.1/trends/place.json?id=";
    const url_local = "https://api.twitter.com/1.1/trends/closest.json?lat="
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [localWoeid, setLocalWoeid] = useState();

    //dummy data
    const [data, setData] = useState(dummyData);
    const dummyData = [
        {
            "trends": [
                {
                    "name": "#8YearsWithTaehyung",
                },
                {
                    "name": "#せふほで本性が分かるらしい",
                },
                {
                    "name": "#あなたのオーラカラー",
                },
                {
                    "name": "#YalnızDeğilsinEzgiMola",
                },
                {
                    "name": "相性抜群",
                },
                {
                    "name": "Luana Araújo",
                },
                {
                    "name": "#水曜日のダウンタウン",
                },
                {
                    "name": "OUR HAPPINESS TAEHYUNG",
                },
                {
                    "name": "荒牧さん",
                },
                {
                    "name": "コリジョン",
                }
            ],
            "as_of": "2021-06-02T14:15:28Z",
            "created_at": "2021-06-01T13:10:48Z",
            "locations": [
                {
                    "name": "Worldwide",
                    "woeid": 1
                }
            ]
        }
    ];

    //woeid 1 = global, woeid 23424829 = Germany
    const [woeid, setWoeid] = useState("1");

    useEffect(() => {
        if (Platform.OS === "android" && Platform.Version >= 28) {
            trendHandler(woeid);
        } else {
            trendHandler("");
        }

        getLocationHandler();
    }, []);

    const trendHandler = async (woeid2) => {
        setIsLoading(true);

        if (Platform.OS === "android" && Platform.Version <= 28)
            woeid2 = woeid;

        try {
            let response = await fetch(url_trend + woeid2, {
                headers: {
                    'Authorization': "bearer " + bearertoken
                }
            });
            response = await response.json();
            console.log('API request received. Mind the rate limit of 75.')
            setData(response);
            if (Platform.OS === "android" && Platform.Version >= 28)
                setWoeid(woeid2);

        } catch (err) {
            console.log('err', err);
        }

        setIsLoading(false);
    };

    const pickerHandler = (itemValue) => {
        if (Platform.OS === "android" && Platform.Version <= 28)
            setWoeid(itemValue);

        trendHandler(itemValue);
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();

        if (!hasPermission) {
            return;
        }

        try {
            setIsLoading(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            console.log("lat: " + location.coords.latitude + ", " + "long: " + location.coords.longitude);
            const lat = location.coords.latitude
            const lng = location.coords.longitude
            localWoeidHandler(lat, lng);
        } catch (error) {
            Alert.alert("Couldn't get location.", "Please try again.", [{ title: "Ok" }]);
        }

        setIsInitialLoading(false);
    }

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== "granted") {
            Alert.alert("No Permissions.", "Please give location permission to use this function.", [{ title: "Ok" }]);
            return false;
        } else {
            return true;
        }
    }

    const localWoeidHandler = async (lat, lng) => {
        try {
            let response = await fetch(url_local + lat + "&long=" + lng, {
                headers: {
                    'Authorization': "bearer " + bearertoken
                }
            });
            response = await response.json();
            setLocalWoeid(response[0].woeid)
        } catch (err) {
            console.log('err', err);
        }
    };

    return (
        <View style={Platform.select({ ios: styles.wrapperIOS, android: { height: adjustedHeight } })}>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <View style={{height: adjustedHeight}} backgroundColor={getBackgroundTheme(colorScheme === 'light')}>
                {isInitialLoading ? (
                            <View>
                            </View>
                        ) : (
                    <View style={LayoutStyles.topContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <DefaultText style={{color: getTextTheme(colorScheme === "light")}}>Select region:</DefaultText>
                            <Picker
                                selectedValue={woeid}
                                mode={'dialog'}
                                style={{ height: 30, width: 140, color: getPickerTextTheme(colorScheme === 'light') }}
                                onValueChange={(itemValue, itemPosition) => pickerHandler(itemValue)}
                            >
                                <Picker.Item label="Global" value="1" />
                                <Picker.Item label="Germany" value="23424829" />
                                <Picker.Item label="Local" value={localWoeid} />
                            </Picker>
                        </View> 
                    </View>)}
                    <View style={LayoutStyles.mainContainer}>
                        {isInitialLoading ? (
                            <View>
                                <Text>Loading...</Text>
                            </View>
                        ) : isLoading ? (
                            <ActivityIndicator style={{ marginTop: 50 }} size="large" color={Colors.primaryBlue}/>
                        ) : (
                            <View style={{ alignItems: 'center', height: '100%' }}>
                                <DescriptionText style={{color: getDescriptionTextTheme(colorScheme === 'light')}}>CURRENT TOP 10 TWITTER TRENDS</DescriptionText>
                                <View style={{ justifyContent: 'space-around', flex: 1 }}>
                                    <TrendButton
                                        title={data[0].trends[0].name}
                                        volume={data[0].trends[0].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[0].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[1].name}
                                        volume={data[0].trends[1].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[1].name);
                                            navigation.navigate("Details");                              
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[2].name}
                                        volume={data[0].trends[2].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[2].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[3].name}
                                        volume={data[0].trends[3].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[3].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[4].name}
                                        volume={data[0].trends[4].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[4].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[5].name}
                                        volume={data[0].trends[5].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[5].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[6].name}
                                        volume={data[0].trends[6].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[6].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[7].name}
                                        volume={data[0].trends[7].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[7].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[8].name}
                                        volume={data[0].trends[8].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[8].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                    <TrendButton
                                        title={data[0].trends[9].name}
                                        volume={data[0].trends[9].tweet_volume}
                                        onClick={() => {
                                            setClickedTrend(data[0].trends[9].name);
                                            navigation.navigate("Details");
                                        }}
                                    />
                                </View>
                            </View>
                        )}
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
});
