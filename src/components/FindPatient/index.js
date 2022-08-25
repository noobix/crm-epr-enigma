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
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, Octicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";
import { firestore } from "../../firebase/config";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";

const FindPatient = (props) => {
  const [lname, setlname] = useState("");
  const [fname, setfname] = useState("");
  const [gender, setgender] = useState(null);
  const [dataset, setdataset] = useState([]);
  const dropdownref = useRef({});
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
      const formateddate = moment(dateOfBirth).format("MMMM DD YYYY");
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
      const formateddate = moment(dateOfBirth).format("MMMM DD YYYY");
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
      const formateddate = moment(dateOfBirth).format("MMMM DD YYYY");
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
      const formateddate = moment(dateOfBirth).format("MMMM DD YYYY");
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
      const formateddate = moment(dateOfBirth).format("MMMM DD YYYY");
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
      const formateddate = moment(dateOfBirth).format("MMMM DD YYYY");
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
      const formateddate = moment(dateOfBirth).format("MMMM DD YYYY");
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset((dataset) => [
        { ...obj, image: url, formatedDate: formateddate },
        ...dataset,
      ]);
    });
  };
  const searchConfig = () => {
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
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
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
        <View style={styles.form}>
          <View>
            <TextInput
              placeholder="Search first name"
              style={{
                width: 230,
                height: 40,
                backgroundColor: "rgb(255,255,255)",
                fontSize: 20,
                marginTop: 10,
                borderWidth: 1,
                borderColor: "rgb(109, 123, 175)",
                padding: 5,
              }}
              value={fname}
              onChangeText={(text) => setfname(text)}
            />
            <TextInput
              placeholder="Search last name"
              style={{
                width: 230,
                height: 40,
                backgroundColor: "rgb(255,255,255)",
                fontSize: 20,
                marginTop: 5,
                borderWidth: 1,
                borderColor: "rgb(109, 123, 175)",
                padding: 5,
              }}
              onChangeText={(text) => setlname(text)}
              value={lname}
            />
            <SelectDropdown
              buttonStyle={{
                height: 40,
                backgroundColor: "rgb(255,255,255)",
                marginTop: 5,
                width: 230,
                borderWidth: 1,
                borderColor: "rgb(109, 123, 175)",
              }}
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
          </View>
          <View
            style={{ flexDirection: "column", marginTop: 10, marginLeft: 10 }}
          >
            <TouchableOpacity
              style={{
                marginBottom: 5,
                width: 95,
                height: 40,
                backgroundColor: "rgb(255,255,255)",
                borderWidth: 1,
                borderColor: "rgb(109, 123, 175)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => reset()}
            >
              <MaterialIcons
                name="clear"
                size={40}
                color="rgb(109, 123, 175)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 95,
                height: 85,
                backgroundColor: "rgb(109, 123, 175)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => searchConfig()}
            >
              <Ionicons name="search" size={60} color="rgb(255,255,255)" />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {dataset &&
            dataset.map(
              (
                { firstName, lastName, formatedDate, gender, image, uid },
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
                      borderWidth: 1,
                      borderColor: "rgb(109, 123, 175)",
                      width: "100%",
                      height: 150,
                      backgroundColor: "rgb(225,225,225)",
                      flexDirection: "row",
                    }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={{ width: 130, height: 130, marginTop: 10 }}
                    />
                    <View style={{ marginHorizontal: 10 }}>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Octicons
                          name="dot"
                          size={25}
                          color="rgb(109, 123, 175)"
                        />
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
                        <Octicons
                          name="dot"
                          size={24}
                          color="rgb(109, 123, 175)"
                        />
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
                        <Octicons
                          name="dot"
                          size={20}
                          color="rgb(109, 123, 175)"
                        />
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
  form: {
    paddingHorizontal: 16,
    backgroundColor: "rgb(245,245,245)",
    width: "100%",
    height: "25%",
    flexDirection: "row",
  },
});
