import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { LoginIntroImage } from "./LoginIntroImage";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Login = (props) => {
  const [patient, setpatient] = useState("");
  const [password, setpassword] = useState("");
  return (
    <React.Fragment>
      <View style={styles.container}>
        <View style={styles.intoimage}>
          <LoginIntroImage />
        </View>
        <View style={styles.form}>
          <View style={styles.inputpatient}>
            <Text style={styles.textlabel}>Email</Text>
            <TextInput
              placeholder="Enter Your Patient ID here"
              value={patient}
              onChangeText={(text) => setpatient(text)}
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
            onPress={() => props.navigation.navigate("doctorcontainer")}
          >
            <MaterialCommunityIcons
              name="send"
              size={30}
              color="rgb(255, 176, 177)"
              style={{ paddingHorizontal: 20 }}
            />
            <Text style={styles.textbutton}>Submit</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 17, marginVertical: 5 }}>
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
            <Text style={{ fontSize: 17, marginVertical: 5 }}>
              Forgot password?, press{" "}
              <Text
                style={{
                  textDecorationLine: "underline",
                  color: "rgb(29, 35, 102)",
                }}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intoimage: {
    flex: 0.5,
  },
  form: {
    flex: 0.5,
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
    borderBottomColor: "rgb(255, 176, 177)",
    color: "rgb(29, 35, 102)",
    fontSize: 20,
    width: 230,
    height: 40,
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
    width: 200,
    height: 60,
    backgroundColor: "rgb(108, 99, 255)",
    marginHorizontal: 60,
    marginVertical: 20,
  },
  textbutton: {
    color: "rgb(255, 176, 177)",
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
