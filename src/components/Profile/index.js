import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = (props) => {
  const handlesignout = async () => {
    await signOut(auth);
    console.log("user signed out");
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.details}>
          <View style={{ flexDirection: "row", marginVertical: 10 }}>
            <View style={styles.profilehead}>
              <Image
                style={styles.image}
                source={{ uri: props.route.params.image }}
              />
              <View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <Text style={styles.textlabel}>Name</Text>
                  <Text style={{ fontSize: 20 }}>
                    {`${props.route.params.firstName} ${props.route.params.lastName}`}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.textlabel}>Email</Text>
                  <Text style={{ fontSize: 20 }}>
                    {props.route.params.email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.profilebody}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textlabel}>Gender</Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {props.route.params.gender}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textlabel}>Date Of Birth</Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {props.route.params.dateOfBirth}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textlabel}>Address</Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {props.route.params.address}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textlabel}>Phone</Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {props.route.params.phone}
              </Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => handlesignout()}>
            <View style={styles.button}>
              <Text style={{ fontSize: 25, color: "white" }}>Log Out</Text>
            </View>
          </TouchableWithoutFeedback>
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
    marginHorizontal: 10,
  },
  image: {
    width: 90,
    height: 90,
  },
  profilebody: {
    marginHorizontal: 10,
  },
  textlabel: {
    marginHorizontal: 5,
    fontSize: 20,
    textDecorationLine: "underline",
  },
  button: {
    width: 100,
    height: 60,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 110,
    marginVertical: 20,
  },
});
