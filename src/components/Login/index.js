import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { LoginIntroImage } from "./LoginIntroImage";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { signInUser } from "../../store/userSlice";
import { login } from "../../store/authSlice";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../Registeration/colors";
import Input from "../Registeration/input";

const Login = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const handleSignIn = () => {
    if (email === "") return;
    if (password === "") return;
    const details = { email, password };
    dispatch(signInUser(details));
  };
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.page}>
          <View style={styles.intoimage}>
            <LoginIntroImage />
          </View>

          <Input
            onChangeText={(text) => setemail(text)}
            iconName="email-outline"
            label="Email"
            value={email}
            placeholder="Enter your email address"
          />

          <Input
            onChangeText={(text) => setpassword(text)}
            iconName="lock-outline"
            label="Password"
            value={password}
            placeholder="Enter your password"
            password
          />

          <TouchableOpacity
            onPress={handleSignIn}
            activeOpacity={0.7}
            style={{
              height: 55,
              width: "100%",
              backgroundColor: COLORS.blue,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 14, marginVertical: 5 }}>
              Don't have an account, press{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "rgb(29, 35, 102)",
                }}
                onPress={() => props.navigation.navigate("registerpatient")}
              >
                here
              </Text>{" "}
              to register
            </Text>
            <Text style={{ fontSize: 14, marginVertical: 5 }}>
              Forgot password?, press{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "rgb(29, 35, 102)",
                }}
                onPress={() => props.navigation.navigate("profile")}
              >
                here
              </Text>{" "}
              to redeem
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text style={styles.helptext}>Help</Text>
              <Ionicons name="help-circle-outline" size={30} color="black" />
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
  },
  page: {
    width: "100%",
    height: "90%",
  },
  intoimage: {
    flex: 3,
  },
  form: {
    flex: 2,
    paddingHorizontal: 16,
  },
  inputpatient: {
    marginVertical: 10,
    flexDirection: "row",
  },
  inputpassword: {
    marginVertical: 5,
    flexDirection: "row",
  },
  textinput: {
    borderBottomWidth: 2,
    borderBottomColor: "rgb(108, 99, 255)",
    color: "rgb(29, 35, 102)",
    fontSize: 20,
    width: 230,
    height: 40,
    marginBottom: 5,
  },
  textlabel: {
    color: "rgb(103, 96, 226)",
    fontSize: 18,
    alignSelf: "center",
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    width: 220,
    height: 50,
    backgroundColor: "rgb(108, 99, 255)",
    marginHorizontal: 60,
    marginVertical: 20,
  },
  textbutton: {
    color: "white",
    fontSize: 40,
    fontWeight: "500",
  },
  helptext: {
    alignSelf: "center",
    fontSize: 17,
    color: "rgb(29, 35, 102)",
    textDecorationLine: "underline",
  },
});
export { Login };
