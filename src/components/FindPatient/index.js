import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  Ionicons,
  Octicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";
import { firestore } from "../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";

const FindPatient = (props) => {
  const [advsearch, setadvsearch] = useState(false);
  const [lname, setlname] = useState("");
  const [fname, setfname] = useState("");
  const [sysid, setsysid] = useState("");
  const [gender, setgender] = useState(null);
  const [dataset, setdataset] = useState([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dropdownref = useRef({});
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  let searchString = "";
  if (fname !== "") {
    searchString += "f";
  }
  if (lname !== "") {
    searchString += "l";
  }
  if (gender !== null) {
    searchString += "g";
  }
  const reset = () => {
    setfname("");
    setlname("");
    dropdownref.current.reset();
    setdataset([]);
  };
  const searchId = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("systemId", "==", sysid.trim().toUpperCase())
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const singleSearchF = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname.trim()),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const singleSearchL = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("lastName", "==", lname.trim()),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const singleSearchG = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("gender", "==", gender),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const doubleSearchFL = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname.trim()),
      where("lastName", "==", lname.trim()),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const doubleSearchFG = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname.trim()),
      where("gender", "==", gender),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const doubleSearchLG = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("lastName", "==", lname.trim()),
      where("gender", "==", gender),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const allSearch = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname.trim()),
      where("lastName", "==", lname.trim()),
      where("gender", "==", gender),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const { dateOfBirth } = obj;
      const formateddate = moment(new Date(dateOfBirth)).format("MMMM Do YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const searchConfig = () => {
    Keyboard.dismiss();
    switch (searchString) {
      case "f":
        setdataset([]);
        singleSearchF();
        break;
      case "l":
        setdataset([]);
        singleSearchL();
        break;
      case "g":
        setdataset([]);
        singleSearchG();
        break;
      case "fl" || "lf":
        setdataset([]);
        doubleSearchFL();
        break;
      case "fg" || "gf":
        setdataset([]);
        doubleSearchFG();
        break;
      case "lg" || "gl":
        setdataset([]);
        doubleSearchLG();
        break;
      case "flg" || "lfg" || "glf" || "fgl" || "gfl" || "lgf":
        setdataset([]);
        allSearch();
        break;
    }
  };
  const renderseacrhresults = (
    firstName,
    lastName,
    formatedDate,
    gender,
    image,
    uid,
    index
  ) => (
    <TouchableWithoutFeedback
      key={index}
      onPress={() =>
        props.navigation.navigate("caselist", {
          name: `${firstName} ${lastName}`,
          uid: uid,
        })
      }
    >
      <View
        onStartShouldSetResponder={() => true}
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: "rgb(109, 123, 175)",
          width: "95%",
          height: 135,
          backgroundColor: "rgb(225,225,225)",
          borderRadius: 20,
          flexDirection: "row",
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 110,
            height: 134,
            borderBottomLeftRadius: 20,
            borderTopLeftRadius: 20,
          }}
        />
        <View style={{ marginHorizontal: 10 }}>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Octicons name="dot" size={25} color="rgb(109, 123, 175)" />
            <Text
              style={{
                marginLeft: 5,
                alignSelf: "center",
                fontSize: 25,
              }}
            >
              {firstName} {lastName}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Octicons name="dot" size={24} color="rgb(109, 123, 175)" />
            <Text
              style={{
                marginLeft: 5,
                alignSelf: "center",
                fontSize: 20,
                color: "rgb(112,128,144)",
              }}
            >
              {formatedDate}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Octicons name="dot" size={20} color="rgb(109, 123, 175)" />
            <Text
              style={{
                marginLeft: 5,
                alignSelf: "center",
                fontSize: 20,
                color: "rgb(112,128,144)",
              }}
            >
              {gender}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        {!isKeyboardVisible ? (
          <View style={styles.search}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons
                style={{ marginLeft: 16 }}
                name="arrow-back"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <KeyboardAvoidingView behavior="height" style={{ flex: 0.2 }}>
          {advsearch ? (
            <View
              style={{
                width: "100%",
                height: "65%",
                backgroundColor: "rgb(245,245,245)",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 16,
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  placeholder="Search first name"
                  style={{
                    width: "45%",
                    height: 45,
                    backgroundColor: "rgb(255,255,255)",
                    fontSize: 20,
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "rgb(109, 123, 175)",
                    backgroundColor: "rgb(230,230,250)",
                    padding: 5,
                  }}
                  value={fname}
                  onChangeText={(text) => setfname(text)}
                />
                <TextInput
                  placeholder="Search last name"
                  style={{
                    width: "45%",
                    height: 45,
                    backgroundColor: "rgb(255,255,255)",
                    fontSize: 20,
                    marginTop: 5,
                    marginTop: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "rgb(109, 123, 175)",
                    backgroundColor: "rgb(230,230,250)",
                    padding: 5,
                  }}
                  onChangeText={(text) => setlname(text)}
                  value={lname}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 16,
                  marginTop: 5,
                  justifyContent: "space-between",
                }}
              >
                <SelectDropdown
                  buttonStyle={{
                    height: 40,
                    backgroundColor: "rgb(230,230,250)",
                    marginTop: 5,
                    width: "45%",
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "rgb(109, 123, 175)",
                  }}
                  buttonTextStyle={{ color: "rgb(169,169,169))" }}
                  ref={dropdownref}
                  defaultButtonText="Select gender"
                  data={["Male", "Female"]}
                  onSelect={(selectedItem, index) => {
                    setgender(selectedItem);
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: "20%",
                    marginTop: 5,
                    marginLeft: 30,
                    alignItems: "center",
                    borderRadius: 5,
                    backgroundColor: "rgb(109, 123, 175)",
                  }}
                  onPress={() => searchConfig()}
                >
                  <Ionicons name="search" size={23} color="rgb(255,255,255)" />
                  <Text
                    style={{
                      color: "rgb(255,255,255)",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    Search
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 40,
                    width: "20%",
                    marginTop: 5,
                    alignItems: "center",
                    borderRadius: 5,
                    backgroundColor: "rgb(109, 123, 175)",
                  }}
                  onPress={() => setadvsearch(false)}
                >
                  <MaterialIcons
                    name="expand-less"
                    size={25}
                    color="rgb(255,255,255)"
                  />
                  <Text
                    style={{
                      color: "rgb(255,255,255)",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    ID Search
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View
              style={{
                width: "100%",
                height: "30%",
                backgroundColor: "rgb(245,245,245)",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TextInput
                placeholder="Enter ID number"
                autoCapitalize={"characters"}
                style={{
                  width: "45%",
                  height: 45,
                  marginTop: 10,
                  marginLeft: 16,
                  padding: 5,
                  borderWidth: 1,
                  fontSize: 20,
                  fontWeight: "500",
                  letterSpacing: 2,
                  borderRadius: 5,
                  borderColor: "rgb(109, 123, 175)",
                  backgroundColor: "rgb(230,230,250)",
                }}
                onChangeText={(text) => setsysid(text)}
                value={sysid}
              />
              <TouchableOpacity
                style={{
                  height: 43,
                  width: "16%",
                  marginTop: 10,
                  alignItems: "center",
                  borderRadius: 5,
                  backgroundColor: "rgb(109, 123, 175)",
                }}
                onPress={() => searchId()}
              >
                <Ionicons name="search" size={25} color="rgb(255,255,255)" />
                <Text
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: 12,
                    alignSelf: "center",
                  }}
                >
                  Search
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 43,
                  width: "17%",
                  marginTop: 10,
                  marginRight: 16,
                  alignItems: "center",
                  borderRadius: 5,
                  backgroundColor: "rgb(109, 123, 175)",
                }}
                onPress={() => setadvsearch(true)}
              >
                <AntDesign
                  name="caretdown"
                  size={25}
                  color="rgb(255,255,255)"
                />
                <Text
                  style={{
                    color: "rgb(255,255,255)",
                    fontSize: 12,
                    alignSelf: "center",
                  }}
                >
                  Adv Search
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
        <ScrollView style={{ flex: 1, marginTop: 15 }}>
          {dataset &&
            dataset.map(
              (
                { firstName, lastName, formatedDate, gender, image, uid },
                index
              ) =>
                renderseacrhresults(
                  firstName,
                  lastName,
                  formatedDate,
                  gender,
                  image,
                  uid,
                  index
                )
            )}
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { FindPatient };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(255,255,255)",
  },
  search: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgb(225,225,225)",
    justifyContent: "flex-end",
  },
});
