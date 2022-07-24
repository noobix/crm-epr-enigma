import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
// import { useDispatch } from "react-redux";

const GetStarted = (props) => {
  setTimeout(() => props.navigation.navigate("login"), 3000);
  //   const dispatch = useDispatch();
  //   const load_component = (utype) => {
  //     dispatch({ type: "USER_TYPE", payload: utype });
  //     props.navigation.navigate("patientlogin");
  //   };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/kentoh131000083.jpg")}
          style={styles.backgroundimg}
          resizeMode="repeat"
        ></ImageBackground>
      </View>
    </React.Fragment>
  );
};
export { GetStarted };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundimg: {
    width: window.width,
    height: window.height,
    position: "relative",
  },
  options: {
    width: "100%",
    height: "30%",
    backgroundColor: "black",
    position: "absolute",
    bottom: 270,
  },
  button: {
    backgroundColor: "rgb(229, 117, 95)",
    width: 200,
    height: 60,
    marginVertical: 20,
    marginHorizontal: 90,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttontext: {
    fontSize: 25,
    color: "rgb(225,225,225)",
  },
});
