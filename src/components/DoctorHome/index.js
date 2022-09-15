import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  Octicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
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
  const [notify, setnotify] = useState(false);
  const [notNumber, setnotNumber] = useState(0);
  const [totalchat, settotalchat] = useState(0);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetch() {
      await getProfile();
    }
    fetch();
  }, []);
  useEffect(() => {
    setnotify(false);
    getnotify();
    allChatcount();
  }, [isFocused, name]);
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
  async function getnotify() {
    const itemstore = collection(firestore, "status");
    const item = query(
      itemstore,
      where("name", "==", name),
      where("status", "==", "unread")
    );
    const querySnapshot = await getDocs(item);
    setnotNumber(querySnapshot.size);
    if (!querySnapshot.empty) {
      setnotify(true);
    }
  }
  async function allChatcount() {
    const itemstore = collection(firestore, "status");
    const item = query(itemstore, where("name", "==", name));
    const querySnapshot = await getDocs(item);
    settotalchat(querySnapshot.size);
  }
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
          <TouchableOpacity
            style={styles.notification}
            hitSlop={{ top: 60, bottom: 40, left: 60, right: 40 }}
            onPress={() =>
              props.navigation.navigate("fetchnotification", { name: name })
            }
          >
            <Ionicons
              name="ios-notifications-outline"
              size={40}
              color="rgb(255,255,255)"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{ marginTop: 70, marginHorizontal: 16, flexDirection: "row" }}
        >
          {notify === true ? (
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: "rgb(255,69,0)",
                borderRadius: 9,
                position: "absolute",
                right: 110,
                bottom: 115,
                zIndex: 1,
              }}
            ></View>
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("findpatient")}
          >
            <Text style={{ color: "rgb(255,255,255)", fontSize: 25 }}>
              Patient
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginLeft: 25 }]}
            onPress={() => props.navigation.navigate("newsfeed")}
          >
            <Text style={{ color: "rgb(255,255,255)", fontSize: 25 }}>
              News feed
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menu}>
          <View style={{ flexDirection: "row", marginTop: 30 }}>
            <View
              style={{
                width: 80,
                height: 60,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: "rgb(140, 129, 150)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Octicons
                name="comment-discussion"
                size={35}
                color="rgb(225,225,225)"
              />
            </View>
            <TouchableOpacity
              style={{
                width: "75%",
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                backgroundColor: "rgb(162, 142, 169)",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                {totalchat} messages in your chat
              </Text>
              <Text style={{ fontSize: 15, fontStyle: "italic" }}>
                {notNumber} new messages not responded to
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View
              style={{
                width: 80,
                height: 60,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: "rgb(140, 129, 150)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="car-emergency"
                size={35}
                color="rgb(225,225,225)"
              />
            </View>
            <TouchableOpacity
              style={{
                width: "75%",
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                backgroundColor: "rgb(162, 142, 169)",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                6 emergencies came in
              </Text>
              <Text style={{ fontSize: 15, fontStyle: "italic" }}>
                1 booked to your clinic
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View
              style={{
                width: 80,
                height: 60,
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: "rgb(140, 129, 150)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="activity" size={35} color="rgb(225,225,225)" />
            </View>
            <TouchableOpacity
              style={{
                width: "75%",
                height: 60,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                backgroundColor: "rgb(162, 142, 169)",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                0 patients for observation
              </Text>
              <Text style={{ fontSize: 15, fontStyle: "italic" }}>
                0 patients transfered for observation
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    backgroundColor: "rgb(109, 123, 175)",
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
    height: "40%",
    position: "absolute",
    bottom: 20,
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
