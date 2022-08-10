import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import { firestore } from "../../firebase/config";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";

const FindPatient = () => {
  const data1 = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [gender, setgender] = useState(null);
  const [dataset, setdataset] = useState([]);
  dataset && console.log("prime:", dataset);
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
    setgender(null);
    setdataset([]);
  };
  // useEffect(() => {
  //   setdataset();
  // }, [dataset]);
  const singleSearchF = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      const url = await getDownloadURL(ref(storage, `images/${obj.uid}`));
      setdataset([...dataset, { ...obj, image: url }]);
      console.log(dataset);
    });
  };
  const singleSearchL = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("lastName", "==", lname),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
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
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  const doubleSearchFL = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname),
      where("lastName", "==", lname),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  const doubleSearchFG = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname),
      where("gender", "==", gender),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  const doubleSearchLG = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("lastName", "==", lname),
      where("gender", "==", gender),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  const allSearch = async () => {
    const itemstore = collection(firestore, "users");
    const item = query(
      itemstore,
      where("firstName", "==", fname),
      where("lastName", "==", lname),
      where("gender", "==", gender),
      where("userType", "==", "Patient")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };
  const searchConfig = () => {
    switch (searchString) {
      case "f":
        singleSearchF();
        break;
      case "l":
        singleSearchL();
        break;
      case "g":
        singleSearchG();
        break;
      case "fl" || "lf":
        doubleSearchFL();
        break;
      case "fg" || "gf":
        doubleSearchFG();
        break;
      case "lg" || "gl":
        doubleSearchLG();
        break;
      case "flg" || "lfg" || "glf" || "fgl" || "gfl" || "lgf":
        allSearch();
        break;
    }
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.searcharea}>
          <Text style={styles.headertext}>Enter search details</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>First Name</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter First name here"
              value={fname}
              onChangeText={(text) => setfname(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Last Name</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Last name here"
              value={lname}
              onChangeText={(text) => setlname(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Gender</Text>
            <SelectDropdown
              buttonStyle={{
                height: 40,
              }}
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
          <View style={{ flexDirection: "row" }}>
            <TouchableWithoutFeedback onPress={() => searchConfig()}>
              <View style={[styles.button, { marginLeft: 140 }]}>
                <Text style={{ color: "rgb(255,255,255)", fontSize: 18 }}>
                  Search
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => reset()}>
              <View style={[styles.button, { marginLeft: 10 }]}>
                <Text style={{ color: "rgb(255,255,255)", fontSize: 18 }}>
                  Reset
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.resultarea}>
          <ScrollView>
            {dataset &&
              dataset.map(
                (
                  { firstName, lastName, dateOfBirth, gender, image },
                  index
                ) => (
                  <View key={index} style={{ flexDirection: "row", flex: 0.3 }}>
                    <Image
                      style={{ width: 90, height: 90 }}
                      source={{ uri: image }}
                    />
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Name</Text>
                        <Text>
                          {firstName} {lastName}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Date Of Birth</Text>
                        <Text>{dateOfBirth}</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Gender</Text>
                        <Text>{gender}</Text>
                      </View>
                    </View>
                  </View>
                )
              )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { FindPatient };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(225,225,225)",
    alignItems: "center",
    justifyContent: "center",
  },
  searcharea: {
    width: "100%",
    height: "35%",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 2.0,
    borderRadius: 15,
  },
  resultarea: {
    width: "100%",
    height: "60%",
    backgroundColor: "rgb(255,255,255)",
    marginTop: 2.0,
    borderRadius: 15,
  },
  formlable: {
    fontSize: 18,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  textinput: {
    borderBottomWidth: 2,
    borderBottomColor: "rgb(255, 176, 177)",
    color: "rgb(29, 35, 102)",
    fontSize: 20,
    width: 200,
    height: 40,
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "rgb(255, 176, 177)",
    borderBottomWidth: 2,
    width: 150,
  },
  headertext: {
    fontSize: 30,
    textDecorationLine: "underline",
    marginTop: 5,
    marginLeft: 20,
  },
  button: {
    height: 40,
    width: 80,
    backgroundColor: "rgb(108, 99, 255)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
