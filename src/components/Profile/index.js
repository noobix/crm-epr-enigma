import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  Feather,
  FontAwesome,
  SimpleLineIcons,
} from "@expo/vector-icons";
const Profile = (props) => {
  const handlesignout = async () => {
    await signOut(auth);
    console.log("user signed out");
  };
  function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) {
      zeroString = "-" + zeroString;
    }
    return zeroString + n;
  }
  const unformatedate = props.route.params?.dateOfBirth;
  const rdate = new Date(unformatedate);
  const day = zeroPad(rdate.getDate(), 2);
  const month = zeroPad(rdate.getMonth() + 1, 2);
  const year = rdate.getFullYear();
  const [dateofbirth, setdateofbirth] = useState(`${month}-${day}-${year}`);
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              style={{ marginLeft: 16 }}
              name="arrow-back"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <Feather
            style={{ marginRight: 16 }}
            name="edit-2"
            size={25}
            color="black"
          />
        </View>
        <View style={styles.profilehead}>
          <Image
            style={{ width: 90, height: 90, borderRadius: 45, marginLeft: 16 }}
            source={{
              uri: props.route.params?.image,
            }}
          />
          <View style={{ justifyContent: "center", marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {props.route.params?.firstName} {props.route.params?.lastName}
            </Text>
            <Text style={{ fontSize: 20, color: "rgb(169,169,169)" }}>
              {props.route.params?.email}
            </Text>
          </View>
        </View>
        <View style={styles.pins}>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <FontAwesome
              name="transgender"
              size={24}
              color="rgb(105,105,105)"
            />
            <Text
              style={{
                fontSize: 20,
                marginBottom: 10,
                color: "rgb(105,105,105)",
                marginLeft: 10,
                fontWeight: "500",
              }}
            >
              {props.route.params?.gender}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Ionicons
              name="ios-calendar-outline"
              size={24}
              color="rgb(105,105,105)"
            />
            <Text
              style={{
                fontSize: 20,
                marginBottom: 10,
                color: "rgb(105,105,105)",
                marginLeft: 10,
                fontWeight: "500",
              }}
            >
              {dateofbirth}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              color="rgb(105,105,105)"
            />
            <Text
              style={{
                fontSize: 20,
                marginBottom: 10,
                color: "rgb(105,105,105)",
                marginLeft: 10,
                fontWeight: "500",
              }}
            >
              {props.route.params?.address}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <Feather name="phone" size={24} color="rgb(105,105,105)" />
            <Text
              style={{
                fontSize: 20,
                marginBottom: 10,
                color: "rgb(105,105,105)",
                marginLeft: 10,
                fontWeight: "500",
              }}
            >
              {props.route.params?.phone}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlesignout()}
          >
            <Text style={{ fontSize: 35, color: "rgb(255,255,255)" }}>
              Logout
            </Text>
          </TouchableOpacity>
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
    backgroundColor: "rgb(255,255,255)",
  },
  profile: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(225,225,225)",
    alignItems: "flex-end",
  },
  profilehead: {
    flexDirection: "row",
    marginTop: 10,
  },
  pins: {
    marginHorizontal: 16,
    marginTop: 30,
  },
  button: {
    width: "90%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(109, 123, 175)",
  },
});
