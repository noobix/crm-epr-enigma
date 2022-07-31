import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.details}></View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { Profile };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(225,225,225)",
  },
  details: {},
});
