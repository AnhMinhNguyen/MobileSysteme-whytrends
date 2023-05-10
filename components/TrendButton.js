import React from 'react';
import { View,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
  Platform
} from 'react-native';
import Colors from '../constants/Colors';
import DefaultText from './DefaultText';
import { useDimensions } from '@react-native-community/hooks';

export default TrendButton = props => {
  let ButtonComponent = TouchableOpacity;
  const { height, width } = useDimensions().window;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <ButtonComponent onPress={props.onClick}>
      <View style={[styles.button, {width: width}]}>
        <DefaultText style={styles.buttonText}>{props.title}</DefaultText>
        <DefaultText style={styles.volumeText}>{props.volume} {props.volume != null ? "Tweets" : ""}</DefaultText>
      </View>
    </ButtonComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    
  },
  buttonText: {
    color: Colors.primaryBlue,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 50,
    paddingRight: 50,
    marginBottom: -4,
  },
  volumeText: {
    color: Colors.primaryBlue,
    fontFamily: "arial-italic",
    fontSize: 14,
    paddingLeft: 50,
    paddingRight: 50,
  }
});