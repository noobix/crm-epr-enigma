import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = (props) => {
  console.log(props.route.params);
  console.log(props.route.params.image);
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.details}>
          <View style={styles.profilehead}>
            <Image
              style={styles.image}
              source={{ uri: props.route.params.image }}
            />
            <View>
              <View>
                <Text></Text>
                <Text></Text>
              </View>
            </View>
          </View>
        </View>
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
  details: {
    backgroundColor: "rgb(255,255,255)",
    width: "90%",
    height: "80%",
  },
  profilehead: {
    flexDirection: "row",
  },
  image: {
    width: 90,
    height: 90,
  },
});
