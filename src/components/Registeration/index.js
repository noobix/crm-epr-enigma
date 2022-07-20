import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { ModalDatePicker } from "react-native-material-date-picker";

const Registeration = (props) => {
  const data1 = [
    { label: "Male", value: 1 },
    { label: "Female", value: 2 },
  ];
  const data2 = [
    { label: "Single", value: 1 },
    { label: "Married", value: 2 },
    { label: "Divorced", value: 3 },
  ];
  const data3 = [
    { label: "Patient", value: 1 },
    { label: "Doctor", value: 2 },
    { label: "Nurse", value: 3 },
  ];
  function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) {
      zeroString = "-" + zeroString;
    }
    return zeroString + n;
  }
  const today = new Date();
  const tday = zeroPad(today.getDate(), 2);
  const tmonth = zeroPad(today.getMonth() + 1, 2);
  const tyear = today.getFullYear();
  const [gender, setgender] = useState(null);
  const [status, setstatus] = useState(null);
  const [type, settype] = useState(null);
  const [date, setdate] = useState(`${tyear}-${tmonth}-${tday}`);
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.formcontainer}>
          <Text style={styles.intotext}>Registration</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.formlable}>Type</Text>
            <Dropdown
              style={[styles.dropdown, { width: 200 }]}
              data={data3}
              labelField="label"
              valueField="value"
              placeholder="Select registration type"
              value={type}
              onChange={(item) => {
                settype(item.label);
              }}
            />
          </View>
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
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Marital Status</Text>
            <Dropdown
              style={styles.dropdown}
              data={data2}
              labelField="label"
              valueField="value"
              placeholder="Select status"
              value={status}
              onChange={(item) => {
                setstatus(item.label);
              }}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.formlable}>Date of Birth</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TextInput
                placeholder="YYYY"
                style={{
                  width: 40,
                  borderBottomWidth: 2,
                  borderBottomColor: "rgb(255, 176, 177)",
                }}
              />
              <TextInput
                placeholder="MM"
                style={{
                  width: 40,
                  borderBottomWidth: 2,
                  borderBottomColor: "rgb(255, 176, 177)",
                }}
              />
              <ModalDatePicker
                button={<Text style={{ fontSize: 17 }}>Select date</Text>}
                locale="en"
                onSelect={(date) => setdate(date)}
                isHideOnSelect={true}
                initialDate={date}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Address</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Address here"
              value={address}
              onChangeText={(text) => setaddress(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Phone</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Phone Number here"
              keyboardType="phone-pad"
              value={address}
              onChangeText={(text) => setaddress(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Email</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Email here"
              value={email}
              onChangeText={(text) => setemail(text)}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Password</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Enter Password here"
              value={password}
              onChangeText={(text) => setpassword}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.formlable}>Password</Text>
            <TextInput
              style={styles.textinput}
              placeholder="Confirm Password here"
              value={cpassword}
              onChangeText={(text) => setcpassword(text)}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.formlable}>Choose profile image</Text>
            <TouchableWithoutFeedback>
              <View style={styles.browsebtn}>
                <Text style={{ fontSize: 16, color: "rgb(255,255,255)" }}>
                  Browse
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate("patientcontainer")}
          >
            <View style={styles.submitbtm}>
              <Text style={{ fontSize: 30, color: "rgb(255,255,255)" }}>
                Submit
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { Registeration };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgb(225,225,225)",
    width: window.width,
    height: window.height,
    alignItems: "center",
    justifyContent: "center",
  },
  formcontainer: {
    width: "95%",
    height: "95%",
    backgroundColor: "rgb(255,255,255)",
  },
  intotext: {
    fontSize: 30,
    fontWeight: "400",
    marginTop: 5,
    marginLeft: 20,
    textDecorationLine: "underline",
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
  browsebtn: {
    width: 60,
    height: 30,
    backgroundColor: "rgb(108, 99, 255)",
    alignItems: "center",
    justifyContent: "center",
  },
  submitbtm: {
    width: 150,
    height: 60,
    backgroundColor: "rgb(108, 99, 255)",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 90,
    marginVertical: 30,
  },
});
