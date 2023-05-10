import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

export default TrendEntry = (props) => {
    return(
    <View style={[styles.view, props.theme]}>
        <DefaultText style={[styles.text, props.style]}>{props.children}</DefaultText>
    </View>
    )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: "arial"
  },
  view: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
    backgroundColor: Colors.secondaryLightGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '90%'
  },
});