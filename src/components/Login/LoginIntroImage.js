import React from "react";
import { View, Image, StyleSheet } from "react-native";

const LoginIntroImage = () => {
  return (
    <React.Fragment>
      <View>
        <Image
          style={styles.image}
          source={require("../../assets/images/undraw_medicine_b1ol.png")}
          resizeMode="cover"
        />
      </View>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export { LoginIntroImage };
