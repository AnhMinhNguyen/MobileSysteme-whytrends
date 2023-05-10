import React from "react";
import { Text, StyleSheet } from "react-native";

export default SettingsText = (props) => {
  return (
    <Text style={[styles.body, props.style]}>{props.children}</Text>
  )
};

const styles = StyleSheet.create({
  body: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "arial",
  },
});