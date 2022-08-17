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
          <View style={styles.form}>
            <View style={styles.inputpatient}>
              <Text style={styles.textlabel}>Email</Text>
              <TextInput
                placeholder="Enter Your Patient ID here"
                value={email}
                onChangeText={(text) => setemail(text)}
                keyboardType="email-address"
                style={[styles.textinput, { marginLeft: 30 }]}
              />
            </View>
            <View style={styles.inputpassword}>
              <Text style={styles.textlabel}>Password</Text>
              <TextInput
                placeholder="Enter Your Password here"
                value={password}
                onChangeText={(text) => setpassword(text)}
                style={styles.textinput}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSignIn()}
            >
              <MaterialCommunityIcons
                name="send"
                size={30}
                color="white"
                style={{ paddingHorizontal: 20 }}
              />
              <Text style={styles.textbutton}>Submit</Text>
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 14, marginVertical: 5 }}>
                Don't have an account, press{" "}
                <Text
                  style={{
                    textDecorationLine: "underline",
                    color: "rgb(29, 35, 102)",
                    fontSize: 20,
                  }}
                  onPress={() => props.navigation.navigate("registerpatient")}
                >
                  register
                </Text>
              </Text>
              <Text style={{ fontSize: 14, marginVertical: 5 }}>
                Forgot password?, press{" "}
                <Text
                  style={{
                    textDecorationLine: "underline",
                    color: "rgb(29, 35, 102)",
                    fontSize: 20,
                  }}
                >
                  redeem
                </Text>
              </Text>
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
                <Text style={styles.helptext}>Help</Text>
                <Ionicons name="help-circle-outline" size={30} color="black" />
              </View>
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
