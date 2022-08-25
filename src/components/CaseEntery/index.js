import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import SelectDropdown from "react-native-select-dropdown";
import { saveCaseDetails } from "../../store/feedbackSlice";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import moment from "moment";

const CaseList = (props) => {
  const [dataset, setdataset] = useState([]);
  const [addcase, setaddcase] = useState(false);
  const [show, setshow] = useState(false);
  const [mode, setmode] = useState(null);
  const [date, setdate] = useState(new Date());
  const [diagnosis, setdiagnosis] = useState("");
  const [doctor, setdoctor] = useState(null);
  const [casetype, setcasetype] = useState(null);
  const [status, setstatus] = useState(null);
  const { authState } = useSelector((state) => ({
    authState: state._persistedReducer.auth,
  }));
  const dispatch = useDispatch();
  async function getuser() {
    const itemstore = collection(firestore, "users");
    const item = query(itemstore, where("uid", "==", authState.userId));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const rsle = doc.data();
      setdoctor(`${rsle.firstName} ${rsle.lastName}`);
    });
  }
  useEffect(() => {
    getCases();
    getuser();
  }, []);
  const handleCreateCase = () => {
    if (diagnosis === "") {
      return;
    }
    const caseData = {
      name: props.route.params.name,
      doctor: doctor,
      date: date,
      diagnosis: diagnosis,
      casetype: casetype,
      status: status,
      uid: props.route.params.uid,
    };
    dispatch(saveCaseDetails(caseData));
    props.navigation.navigate("findpatient");
  };
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setshow(false);
    setdate(currentDate.toLocaleString());
  };
  const showMode = (currentMode) => {
    setshow(true);
    setmode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  async function getCases() {
    const itemstore = collection(firestore, "case");
    const item = query(itemstore, where("uid", "==", props.route.params.uid));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setdataset((dataset) => [
        { ...obj, name: props.route.params.name, id: doc.id },
        ...dataset,
      ]);
    });
  }
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.caseentry}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              style={{ marginLeft: 16 }}
              name="arrow-back"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 5,
            marginTop: 5,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 30 }}>List of cases</Text>
          <TouchableOpacity
            style={{
              width: 100,
              height: 35,
              backgroundColor: "rgb(109, 123, 175)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setaddcase(true)}
          >
            <Text style={{ color: "rgb(255,255,255)", fontSize: 25 }}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {addcase === true ? (
            <View
              style={{
                width: "100%",
                height: "85%",
                backgroundColor: "rgb(245,245,245)",
              }}
            >
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}
              >
                <Ionicons
                  name="person-outline"
                  size={30}
                  color="rgb(105,105,105)"
                />
                <Text style={{ fontSize: 22, marginLeft: 10 }}>
                  {props.route.params.name}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}
              >
                <MaterialCommunityIcons
                  name="doctor"
                  size={30}
                  color="rgb(105,105,105)"
                />
                <Text style={{ fontSize: 22, marginLeft: 10 }}>{doctor}</Text>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}
              >
                <Fontisto name="date" size={30} color="rgb(105,105,105)" />
                <TouchableOpacity
                  style={{
                    width: 200,
                    height: 40,
                    marginLeft: 10,
                  }}
                  onPress={() => showDatepicker()}
                >
                  <Text style={{ fontSize: 22 }}>Select Date</Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChangeDate}
                  />
                )}
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 0, marginLeft: 10 }}
              >
                <Ionicons
                  name="information-circle"
                  size={30}
                  color="rgb(105,105,105)"
                  style={{ alignSelf: "center" }}
                />
                <TextInput
                  placeholder="Enter Diagnosis"
                  style={{
                    width: 250,
                    height: 50,
                    backgroundColor: "rgb(255,255,255)",
                    alignSelf: "center",
                    marginLeft: 10,
                    alignSelf: "center",
                    fontSize: 20,
                    padding: 5,
                  }}
                  onChangeText={(text) => setdiagnosis(text)}
                />
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}
              >
                <Ionicons name="options" size={30} color="rgb(105,105,105)" />
                <View style={{ marginLeft: 10 }}>
                  <SelectDropdown
                    data={["Outpatient", "Surgical", "Inpatient"]}
                    onSelect={(selectedItem, index) => {
                      setcasetype(selectedItem);
                    }}
                    buttonStyle={{
                      width: 250,
                      backgroundColor: "rgb(255,255,255)",
                    }}
                    defaultButtonText="Select case type"
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>
              </View>
              <View
                style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}
              >
                <MaterialCommunityIcons
                  name="list-status"
                  size={30}
                  color="rgb(105,105,105))"
                />
                <View style={{ marginLeft: 10 }}>
                  <SelectDropdown
                    data={["Open", "Close"]}
                    onSelect={(selectedItem, index) => {
                      setstatus(selectedItem);
                    }}
                    defaultButtonText="Select Status"
                    buttonStyle={{
                      width: 250,
                      backgroundColor: "rgb(255,255,255)",
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 40,
                  justifyContent: "flex-end",
                  marginRight: 5,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 120,
                    height: 60,
                    backgroundColor: "rgb(109, 123, 175)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => setaddcase(false)}
                >
                  <Text style={{ fontSize: 35, color: "rgb(255,255,255)" }}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleCreateCase()}
                  style={{
                    width: 120,
                    height: 60,
                    backgroundColor: "rgb(109, 123, 175)",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 25,
                  }}
                >
                  <Text style={{ fontSize: 35, color: "rgb(255,255,255)" }}>
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ScrollView>
              {dataset &&
                dataset
                  .sort((a, b) => a.status.localeCompare(b.status))
                  .sort((a, b) => (Number(a.date) > Number(b.date) ? 1 : -1))
                  .map(
                    (
                      { status, doctor, date, casetype, name, diagnosis, id },
                      index
                    ) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() =>
                          props.navigation.navigate("replyfeedback", {
                            status,
                            doctor,
                            date,
                            casetype,
                            id,
                            name,
                          })
                        }
                      >
                        <View
                          style={{
                            height: 120,
                            marginVertical: 10,
                            backgroundColor: "rgb(245,245,245)",
                            paddingLeft: 10,
                            flexDirection: "row",
                          }}
                        >
                          <View style={{ marginTop: 5 }}>
                            <View style={{ flexDirection: "row" }}>
                              <MaterialIcons
                                name="person-outline"
                                size={30}
                                color="rgb(119,136,153)"
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  alignSelf: "center",
                                  fontWeight: "500",
                                }}
                              >
                                {name}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Ionicons
                                name="options"
                                size={30}
                                color="rgb(119,136,153)"
                              />
                              <Text
                                style={{
                                  fontSize: 15,
                                  alignSelf: "center",
                                  marginLeft: 3,
                                }}
                              >
                                {casetype}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Fontisto
                                name="date"
                                size={30}
                                color="rgb(119,136,153)"
                              />
                              <Text
                                style={{
                                  fontSize: 15,
                                  alignSelf: "center",
                                  marginLeft: 3,
                                }}
                              >
                                {moment(date).format("dddd MMM Do YY")}
                              </Text>
                            </View>
                          </View>
                          <View style={{ marginTop: 5, marginLeft: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                              <Fontisto
                                name="doctor"
                                size={30}
                                color="rgb(119,136,153)"
                              />
                              <Text
                                style={{
                                  fontSize: 18,
                                  alignSelf: "center",
                                  marginLeft: 3,
                                }}
                              >
                                {doctor}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <Ionicons
                                name="information-circle"
                                size={30}
                                color="rgb(119,136,153)"
                              />
                              <Text
                                style={{
                                  fontSize: 15,
                                  alignSelf: "center",
                                  marginLeft: 3,
                                }}
                              >
                                {diagnosis}
                              </Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <MaterialCommunityIcons
                                name="list-status"
                                size={30}
                                color="rgb(119,136,153)"
                              />
                              <Text
                                style={{
                                  fontSize: 15,
                                  alignSelf: "center",
                                  marginLeft: 3,
                                }}
                              >
                                {status}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  )}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { CaseList };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(255,255,255)",
  },
  caseentry: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgb(225,225,225)",
    justifyContent: "flex-end",
  },
});
