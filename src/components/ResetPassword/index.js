import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  View,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { redeemPassword } from "../../store/userSlice";

const ResetPassword = (props) => {
  const [email, setemail] = useState(props.route.params.email);
  const dispatch = useDispatch();
  const handlePassword = () => {
    if (email === "") {
      showToast("Email required");
      return;
    }
    const address = email.toLowerCase().trim();
    dispatch(redeemPassword(address));
  };
  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/6195/6195699.png",
          }}
          style={{ width: 300, height: 300, alignSelf: "center" }}
        />
        <Text
          style={{
            alignSelf: "center",
            fontSize: 28,
            fontWeight: "500",
            color: "rgb(221,23,20)",
            marginTop: 23,
          }}
        >
          Verify Email Address
        </Text>
        <TextInput
          style={{
            borderRadius: 5,
            borderColor: "rgb(109, 123, 175)",
            backgroundColor: "rgb(230,230,250)",
            width: "90%",
            height: 40,
            marginLeft: 16,
            padding: 10,
            fontSize: 19,
          }}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => setemail(text)}
          value={email}
        />
        <TouchableOpacity
          style={{
            width: "60%",
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 60,
            marginTop: 30,
            backgroundColor: "rgb(109, 123, 175)",
          }}
          onPress={() => handlePassword()}
        >
          <Text style={{ color: "rgb(255,255,255)", fontSize: 25 }}>
            Send Email
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { ResetPassword };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(255,255,255)",
  },
});
