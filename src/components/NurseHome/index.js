import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { authdata } from "../../store/authSlice";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";

const NurseHome = (props) => {
  const [search, setsearch] = useState("");
  const { userId } = useSelector(authdata);
  const [name, setname] = useState("");
  const [img, setimg] = useState(null);
  const [profiledata, setprofiledata] = useState({});
  const { authState } = useSelector((state) => ({
    authState: state._persistedReducer.auth,
  }));
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
        <View style={styles.userdetails}>
          <View>
            <Text style={styles.grettingtext}>Welcome</Text>
            <Text style={styles.doctornametext}>{name}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate("profile", profiledata)}
          >
            <Image
              style={styles.profileimg}
              source={{
                uri: img,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.menu}>
          <TextInput
            placeholder="Search patients here"
            style={styles.searchinput}
            value={search}
            onChangeText={(text) => setsearch(text)}
          />
          <Octicons
            style={{
              position: "absolute",
              top: 6,
              left: 6,
              backgroundColor: "rgb(255,255,255)",
            }}
            name="search"
            size={37}
            color="black"
          />
          <View style={styles.menulist}>
            <View>
              <TouchableWithoutFeedback>
                <View style={styles.iconmenu}>
                  <Image
                    style={styles.imgicon}
                    source={require("../../assets/images/consultation.png")}
                  />
                  <Text style={{ alignSelf: "center" }}>Out Patient</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.iconmenu}>
                  <Image
                    style={styles.imgicon}
                    source={require("../../assets/images/hospital-bed.png")}
                  />
                  <Text style={{ alignSelf: "center" }}>In Patient</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback>
                <View style={styles.iconmenu}>
                  <Image
                    style={styles.imgicon}
                    source={require("../../assets/images/emergency.png")}
                  />
                  <Text style={{ alignSelf: "center" }}>Emergency Room</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.iconmenu}>
                  <Image
                    style={styles.imgicon}
                    source={require("../../assets/images/bed.png")}
                  />
                  <Text style={{ alignSelf: "center" }}>Detention</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
        <View style={styles.patient}>
          <TouchableWithoutFeedback>
            <View style={styles.careperson}>
              <Image
                style={styles.careimg}
                source={require("../../assets/images/examination.png")}
              />
              <Text style={{ alignSelf: "center" }}>Your Patient</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.careperson}>
              <Image
                style={styles.careimg}
                source={require("../../assets/images/doctor.png")}
              />
              <Text style={{ alignSelf: "center" }}>Doctor</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { NurseHome };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgb(225,225,225)",
    width: window.width,
    height: window.height,
  },
  grettingtext: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 5,
  },
  doctornametext: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 5,
  },
  profileimg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 5,
    marginTop: 5,
  },
  userdetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 70,
  },
  menu: {
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 310,
  },
  searchinput: {
    backgroundColor: "rgb(225,225,225)",
    marginHorizontal: 5,
    marginVertical: 5,
    width: 320,
    height: 40,
    paddingLeft: 40,
    fontSize: 22,
  },
  menulist: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  iconmenu: {
    backgroundColor: "rgb(225,225,225)",
    marginBottom: 10,
  },
  imgicon: {
    width: 120,
    height: 100,
    alignSelf: "center",
  },
  patient: {
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 145,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  careimg: {
    width: 120,
    height: 120,
  },
  careperson: {
    backgroundColor: "rgb(225,225,225)",
    width: 130,
    height: 135,
    marginVertical: 5,
  },
});
