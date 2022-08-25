import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";

const DoctorHome = (props) => {
  const { authState } = useSelector((state) => ({
    authState: state._persistedReducer.auth,
  }));
  const [name, setname] = useState("");
  const [img, setimg] = useState(null);
  const [profiledata, setprofiledata] = useState({});
  useEffect(() => {
    async function fetch() {
      await getProfile();
    }
    fetch();
  }, []);
  const getProfile = async () => {
    try {
      const docRef = doc(firestore, "users", authState.userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        const profile = docSnap.data();
        const { firstName, lastName } = profile;
        const url = await getDownloadURL(
          ref(storage, `images/${authState.userId}`)
        );
        setprofiledata({ ...profile, image: url });
        setname(`${firstName} ${lastName}`);
        setimg(url);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("profile", profiledata)}
            hitSlop={{ top: 60, bottom: 40, left: 60, right: 40 }}
          >
            <Image source={{ uri: img }} style={styles.profilephoto} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notification}>
            <Ionicons
              name="ios-notifications-outline"
              size={40}
              color="rgb(173,255,47)"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ marginTop: 70, marginHorizontal: 16, flexDirection: "row" }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("findpatient")}
          >
            <Text style={{ color: "rgb(255,255,255)", fontSize: 25 }}>
              Patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { marginLeft: 25 }]}>
            <Text style={{ color: "rgb(255,255,255)", fontSize: 25 }}>
              Appointment
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menu}></View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { DoctorHome };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(255,255,255)",
    position: "relative",
  },
  profile: {
    width: "100%",
    height: "35%",
    borderBottomEndRadius: 90,
    backgroundColor: "rgb(109, 123, 175)",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  profilephoto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    position: "absolute",
    right: 0,
    bottom: -60,
    borderWidth: 5,
    borderColor: "rgb(255,255,255)",
  },
  notification: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgb(138,43,226)",
    position: "absolute",
    right: 110,
    bottom: -20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgb(255,255,255)",
  },
  menu: {
    width: "90%",
    height: "30%",
    backgroundColor: "rgb(245,245,245)",
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "rgb(109, 123, 175)",
    justifyContent: "center",
    alignItems: "center",
  },
});
