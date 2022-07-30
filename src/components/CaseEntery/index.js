import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import COLORS from '../Registeration/colors.js';
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from "react-native-element-dropdown";

const CaseEntery = () => {
  const [show, setshow] = useState(false);
  const [mode, setmode] = useState(null);
  const [date, setdate] = useState(new Date());
  const [diagnosis, setdiagnosis] = useState("");
  const [casetype, setcasetype] = useState(null);
  const [status, setstatus] = useState(null);
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
  const data1 = [
    { label: "Outpatient", value: 1 },
    { label: "Surgical", value: 2 },
    { label: "Inpatient", value: 3 },
  ];
  const data2 = [
    { label: "Open", value: 1 },
    { label: "Closed", value: 2 },
  ];
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.casedetails}>
          <Text style={styles.headertext}>CASE ENTERY</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.formlable}>Name of Patient</Text>
            <Text></Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 3 }}>
            <Text style={styles.formlable}>Name of Doctor</Text>
            <Text></Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Date of Comsultation</Text>
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
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Diagnosis</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Diagnosis"
              value={diagnosis}
              onChangeText={(text) => setdiagnosis(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Case Type</Text>
            <Dropdown
              style={styles.dropdown}
              data={data1}
              labelField="label"
              valueField="value"
              placeholder="Select case type"
              value={casetype}
              onChange={(item) => {
                setcasetype(item.label);
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Status</Text>
            <Dropdown
              style={styles.dropdown}
              data={data2}
              labelField="label"
              valueField="value"
              placeholder="Select Status"
              value={status}
              onChange={(item) => {
                setstatus(item.label);
              }}
            />
          </View>
          {/* <TouchableWithoutFeedback> */}
            {/* <View style={styles.savebutton}>
              <Text style={{ color: "rgb(255,255,255)", fontSize: 18 }}>
                Save
              </Text>
            </View> */}
                  {/* activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.blue,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
        Save
      </Text>
          </TouchableWithoutFeedback> */}
            <TouchableOpacity
      activeOpacity={0.7}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.blue,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
        Save
      </Text>
    </TouchableOpacity>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { CaseEntery };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    width: window.width,
    height: window.height,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  casedetails: {
    width: "100%",
    height: "50%",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 2.0,
    borderRadius: 15,
  },
  formlable: {
    fontSize: 20,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  textinput: {
    borderBottomWidth: 2,
    borderBottomColor: "rgb(108, 99, 255)",
    color: "rgb(29, 35, 102)",
    fontSize: 20,
    width: 180,
    height: 40,
    // marginLeft: 70,
  },
  headertext: {
    fontSize: 40,
    textDecorationLine: "underline",
    marginTop: 5,
    marginLeft: 20,
    textAlign: "center",
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "rgb(108, 99, 255)",
    borderBottomWidth: 2,
    width: 150,
    // marginLeft: 80,
  },
  savebutton: {
    height: 40,
    width: 80,
    backgroundColor: "rgb(108, 99, 255)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 220,
    marginVertical: 20,
  },
});
