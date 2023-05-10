import React from "react";
import { Text, StyleSheet } from "react-native";

export default DefaultText = (props) => {
  return (
    <Text style={[styles.body, props.style]}>{props.children}</Text>
  )
};

const styles = StyleSheet.create({
  body: {
    fontSize: 14,
    fontFamily: "arial",
  },
});
