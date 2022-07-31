import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import COLORS from "./colors.js";
import Input from "./input";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { registerUser } from "../../store/userSlice";
import * as ImagePicker from "expo-image-picker";

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
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setimage(result.uri);
      }
      // console.log(result)
    } catch (error) {
      console.log(error);
    }
  };
  const handleReg = () => {
    let [first, last] = fullname.split(" ");
    setfname(first);
    setlname(last);
    const regdata = {
      userType: type,
      firstName: fname,
      lastName: lname,
      fullname: fullname,
      gender: gender,
      marritalStatus: status,
      dateOfBirth: date,
      address: address,
      phone: phone,
      email: email,
    };
    if (password !== cpassword) return;
    if (fname === "") return;
    if (lname === "") return;
    if (fullname === "") return;
    if (type === null) return;
    if (gender === null) return;
    if (status === null) return;
    dispatch(registerUser({ email, password, regdata, image }));
    props.navigation.navigate("login");
  };
  // const today = new Date();
  // const tday = zeroPad(today.getDate(), 2);
  // const tmonth = zeroPad(today.getMonth() + 1, 2);
  // const tyear = today.getFullYear();
  const [show, setshow] = useState(false);
  const [mode, setmode] = useState(null);
  const [gender, setgender] = useState(null);
  const [status, setstatus] = useState(null);
  const [type, settype] = useState(null);
  const [date, setdate] = useState(new Date());
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [fullname, setfullname] = useState("");
  const [address, setaddress] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [phone, setphone] = useState("");
  const [image, setimage] = useState(null);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView>
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
            {/* <View style={{ flexDirection: "row" }}>
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
            </View> */}
            <Input
              onChangeText={(text) => setfullname(text)}
              iconName="account-outline"
              label="Full Name"
              value={fullname}
              placeholder="Enter your full name"
            />
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
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.formlable}>Address</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Enter Address here"
                value={address}
                onChangeText={(text) => setaddress(text)}
              />
            </View> */}
            <Input
              onChangeText={(text) => setaddress(text)}
              // onFocus={() => handleError(null, 'phone')}
              iconName="home-outline"
              label="Address"
              value={address}
              placeholder="Enter Address here"
            />
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.formlable}>Phone</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Enter Phone Number here"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(text) => setphone(text)}
              />
            </View> */}
            <Input
              keyboardType="numeric"
              onChangeText={(text) => setphone(text)}
              // onFocus={() => handleError(null, 'phone')}
              iconName="phone-outline"
              label="Phone Number"
              value={phone}
              placeholder="Enter your phone number"
              // error={errors.phone}
            />
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.formlable}>Email</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Enter Email here"
                value={email}
                keyboardType="email-address"
                onChangeText={(text) => setemail(text)}
              />
            </View> */}

            <Input
              onChangeText={(text) => setemail(text)}
              // onFocus={() => handleError(null, 'email')}
              iconName="email-outline"
              label="Email"
              value={email}
              placeholder="Enter your email address"
              // error={errors.email}
            />
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.formlable}>Password</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Enter Password here"
                secureTextEntry
                value={password}
                onChangeText={(text) => setpassword(text)}
              />
            </View> */}
            <Input
              onChangeText={(text) => setpassword(text)}
              // onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Password"
              value={password}
              placeholder="Enter your password"
              // error={errors.password}
              password
            />
            {/* <View style={{ flexDirection: "row" }}>
              <Text style={styles.formlable}>Password</Text>
              <TextInput
                style={styles.textinput}
                secureTextEntry
                placeholder="Confirm Password here"
                value={cpassword}
                onChangeText={(text) => setcpassword(text)}
              />
            </View> */}
            <Input
              onChangeText={(text) => setcpassword(text)}
              // onFocus={() => handleError(null, 'password')}
              iconName="lock-outline"
              label="Confirm Password"
              value={password}
              placeholder=" Confirm your password"
              // error={errors.password}
              password
            />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={styles.formlable}>Choose profile image</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  pickImage();
                }}
              >
                {image ? (
                  <Text
                    style={{
                      fontSize: 16,
                      color: "rgb(103,76,321)",
                      alignSelf: "center",
                      fontWeight: "500",
                    }}
                  >
                    Image Selected
                  </Text>
                ) : (
                  <View style={styles.browsebtn}>
                    <Text style={{ fontSize: 16, color: "rgb(255,255,255)" }}>
                      Browse
                    </Text>
                  </View>
                )}
              </TouchableWithoutFeedback>
            </View>
            {/* <TouchableWithoutFeedback onPress={() => handleReg()}>
              <View style={styles.submitbtm}>
                <Text style={{ fontSize: 30, color: "rgb(255,255,255)" }}>
                  Submit
                </Text>
              </View>
            </TouchableWithoutFeedback> */}
            <TouchableOpacity
              onPress={() => handleReg()}
              activeOpacity={0.7}
              style={{
                height: 55,
                width: "100%",
                backgroundColor: COLORS.blue,
                marginVertical: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { Registeration };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    width: window.width,
    height: window.height,
  },
  formcontainer: {
    width: "100%",
    height: "100%",
  },
  intotext: {
    fontSize: 30,
    fontWeight: "400",
    marginTop: 5,
    marginLeft: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
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
    textAlign: "center",
  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "rgb(108, 99, 255)",
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
