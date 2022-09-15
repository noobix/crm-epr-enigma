import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import {
  doc,
  getDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";

const PatientHome = (props) => {
  const [name, setname] = useState("");
  const [img, setimg] = useState(null);
  const [profiledata, setprofiledata] = useState({});
  const [uid, setuid] = useState(null);
  const [notify, setnotify] = useState(false);
  const isFocused = useIsFocused();
  const { authState } = useSelector((state) => ({
    authState: state._persistedReducer.auth,
  }));
  useEffect(() => {
    async function fetch() {
      await getProfile();
    }
    fetch();
  }, []);
  useEffect(() => {
    setnotify(false);
    getnotify();
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
    if (querySnapshot.size > 0) {
      setnotify(true);
    }
  }
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.profile}></View>
        <View style={styles.profileimg}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("profile", profiledata)}
            hitSlop={{ top: 60, bottom: 40, left: 60, right: 40 }}
          >
            <View>
              <Image
                source={{ uri: img }}
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 70,
                  position: "absolute",
                  left: -3,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", marginTop: 100 }}>
          <Text style={{ fontSize: 35, fontWeight: "500" }}>{name}</Text>
        </View>
        <View>
          {notify === true ? (
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: "rgb(255,69,0)",
                borderRadius: 10,
                position: "absolute",
                right: 187,
                bottom: -27,
                zIndex: 1,
              }}
            ></View>
          ) : null}
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              props.navigation.navigate("feedback", {
                uid: authState.userId,
                name: name,
              })
            }
          >
            <Text style={{ fontSize: 25, color: "white", fontWeight: "400" }}>
              Treatment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("newsfeed")}
          >
            <Text style={{ fontSize: 25, color: "white", fontWeight: "400" }}>
              News Feed
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.appointment}>
          <Text style={styles.appointmenttext}>Your next appointment</Text>
          <View style={styles.doctorprofile}>
            <Image
              style={styles.doctorimg}
              source={{
                uri: "https://images.pexels.com/photos/7447008/pexels-photo-7447008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
            />
            <View>
              <Text style={styles.doctornametext}>Dr Sylvania Brown</Text>
              <Text style={{ fontSize: 17, color: "rgb(128,128,128)" }}>
                General Physician
              </Text>
              <TouchableOpacity>
                <View style={styles.appointmentbtn}>
                  <Text style={{ fontSize: 16, color: "rgb(255,255,255)" }}>
                    <AntDesign
                      name="calendar"
                      size={24}
                      color="rgb(255,255,255)"
                    />{" "}
                    Wednesday 26,October{" "}
                    <MaterialCommunityIcons
                      name="clock-time-eight-outline"
                      size={24}
                      color="rgb(255,255,255)"
                    />{" "}
                    12:00 am
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { PatientHome };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
    width: window.width,
    height: window.height,
    position: "relative",
  },
  profile: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(225,225,225)",
    alignItems: "flex-end",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileimg: {
    width: 140,
    height: 140,
    borderRadius: 70,
    position: "absolute",
    top: 60,
    right: 110,
    borderWidth: 8,
    borderColor: "rgb(255,255,255)",
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(109, 123, 175)",
  },
  appointment: {
    backgroundColor: "rgb(220,220,220))",
    marginVertical: 3,
    borderRadius: 10,
    width: "90%",
    height: "35%",
    marginLeft: 15,
    marginTop: 30,
  },
  appointmenttext: {
    color: "rgb(128,128,128)",
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontWeight: "500",
  },
  doctorprofile: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    position: "relative",
  },
  appointmentbtn: {
    width: "155%",
    height: 50,
    backgroundColor: "rgb(109, 123, 175)",
    color: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    position: "absolute",
    right: -25,
    top: 10,
  },
  doctornametext: {
    marginVertical: 5,
    fontSize: 25,
    fontWeight: "500",
  },
  doctorimg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
