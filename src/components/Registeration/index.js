import React, { useEffect, useState } from "react";
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
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { registerUser } from "../../store/userSlice";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";

const Registeration = (props) => {
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setshow(false);
    if (event?.type === "dismissed") {
      setdate(date);
      return;
    }
    setdate(currentDate.toLocaleString());
  };
  useEffect(() => {
    if (moment(date) !== moment()) {
      setbirthday(moment(date).format("MMM DD YYYY"));
    }
  }, [date]);
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
        presentationStyle: 0,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setimage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const [first, last] = fullname.split(" ");
    setfname(first);
    setlname(last);
  }, [fullname]);
  const handleReg = () => {
    const regdata = {
      userType: type,
      firstName: fname,
      lastName: lname,
      gender: gender,
      marritalStatus: status,
      dateOfBirth: date,
      address: address,
      phone: phone,
      email: email.trim(),
    };
    if (password !== cpassword) return;
    if (fname === "") return;
    if (lname === "") return;
    if (type === null) return;
    if (gender === null) return;
    if (status === null) return;
    dispatch(registerUser({ email, password, regdata, image }));
    props.navigation.navigate("login");
  };

  const [show, setshow] = useState(false);
  const [mode, setmode] = useState(null);
  const [gender, setgender] = useState(null);
  const [status, setstatus] = useState(null);
  const [type, settype] = useState(null);
  const [date, setdate] = useState(new Date());
  const [birthday, setbirthday] = useState(null);
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
            <View style={{ marginTop: 10 }}>
              <Text style={styles.formlable}>Type</Text>
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: COLORS.light,
                  height: 40,
                  paddingHorizontal: 15,
                  width: 370,
                }}
                buttonTextStyle={{ color: COLORS.grey }}
                data={["Patient", "Doctor", "Nurse"]}
                onSelect={(selectedItem, index) => {
                  settype(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>

            <Input
              onChangeText={(text) => setfullname(text)}
              iconName="account-outline"
              label="Full Name"
              value={fullname}
              placeholder="Enter your full name"
            />
            <View>
              <Text style={styles.formlable}>Gender</Text>
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: COLORS.light,
                  height: 40,
                  paddingHorizontal: 15,
                  width: 370,
                }}
                buttonTextStyle={{ color: COLORS.grey }}
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
            <View style={{ marginTop: 10 }}>
              <Text style={styles.formlable}>Marital Status</Text>
              <SelectDropdown
                buttonStyle={{
                  backgroundColor: COLORS.light,
                  height: 40,
                  paddingHorizontal: 15,
                  width: 370,
                }}
                buttonTextStyle={{ color: COLORS.grey }}
                data={["Single", "Married", "Divorced", "Separated"]}
                onSelect={(selectedItem, index) => {
                  setstatus(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.formlable}>Date of Birth</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.light,
                  height: 40,
                  paddingHorizontal: 15,
                  width: 370,
                  justifyContent: "center",
                }}
                onPress={() => showDatepicker()}
              >
                <Text
                  style={{
                    color: COLORS.grey,
                    alignSelf: "center",
                    fontSize: 22,
                  }}
                >
                  {birthday ? (
                    <Text>{birthday}</Text>
                  ) : (
                    <Text>Select date</Text>
                  )}
                </Text>
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

            <Input
              onChangeText={(text) => setaddress(text)}
              iconName="home-outline"
              label="Address"
              value={address}
              placeholder="Enter Address here"
            />

            <Input
              keyboardType="numeric"
              onChangeText={(text) => setphone(text)}
              iconName="phone-outline"
              label="Phone Number"
              value={phone}
              placeholder="Enter your phone number"
            />

            <Input
              onChangeText={(text) => setemail(text)}
              iconName="email-outline"
              label="Email"
              value={email}
              placeholder="Enter your email address"
            />
            <Input
              onChangeText={(text) => setpassword(text)}
              iconName="lock-outline"
              label="Password"
              value={password}
              placeholder="Enter your password"
              password
            />
            <Input
              onChangeText={(text) => setcpassword(text)}
              iconName="lock-outline"
              label="Confirm Password"
              value={cpassword}
              placeholder=" Confirm your password"
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
            <TouchableOpacity
              onPress={() => handleReg()}
              activeOpacity={0.7}
              style={{
                height: 55,
                width: "100%",
                backgroundColor: COLORS.blue,
                marginVertical: 40,
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
    color: "rgb(105,105,105)",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  formlable: {
    // fontSize: 18,
    // alignSelf: "center",
    // marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
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
    marginLeft: 5,
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
