import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";

const FindPatient = () => {
  const data1 = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];
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
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [gender, setgender] = useState(null);
  const [show, setshow] = useState(false);
  const [mode, setmode] = useState(null);
  const [date, setdate] = useState(new Date());
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
            <Dropdown
              style={styles.dropdown}
              data={data1}
              labelField="label"
              valueField="value"
              placeholder="Select gender"
              value={gender}
              onChange={(item) => {
                setgender(item.label);
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.formlable}>Date of Birth</Text>
            <Button onPress={showDatepicker} title="Select Date" />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChangeDate}
              />
            )}
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.searchbutton}>
              <Text style={{ color: "rgb(255,255,255)", fontSize: 18 }}>
                Submit
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.resultarea}></View>
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
    height: "38%",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 2.0,
    borderRadius: 15,
  },
  resultarea: {
    width: "100%",
    height: "57%",
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
  searchbutton: {
    height: 40,
    width: 80,
    backgroundColor: "rgb(108, 99, 255)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 220,
  },
});
