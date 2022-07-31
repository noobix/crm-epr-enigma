import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Image,  
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
        <View style={styles.txt1} >
        <Image style={{width: 90, height: 90,}} source={require("../../assets/images/hosp.png")} />
      <Text style={{fontSize:20}} >FEEDBACK APPLICATION</Text>
      </View>
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
  txt1: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection : 'row',
   marginRight:50,
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
