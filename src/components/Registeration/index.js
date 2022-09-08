import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ToastAndroid,
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
        allowsEditing: false,
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
  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
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
    console.log(regdata);
    if (password !== cpassword) {
      showToast("Password does not match");
      return;
    }
    if (fname === "") {
      showToast("First name required");
      return;
    }
    if (lname === "") {
      showToast("LastName required");
      return;
    }
    if (type === null) {
      showToast("Please choose marrital status");
      return;
    }
    if (gender === null) {
      showToast("Please choose gender");
      return;
    }
    if (status === null) {
      showToast("Please Choose registration type");
      return;
    }
    dispatch(registerUser({ email, password, regdata, image }));
    props.navigation.navigate("login");
  };

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
  const [image, setimage] = useState(
    require("../../assets/images/1077114.png")
  );
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
              onChangeText={(text) => setfname(text)}
              iconName="account-outline"
              label="Fist Name"
              value={fname}
              placeholder="Enter your first name"
            />
            <Input
              onChangeText={(text) => setlname(text)}
              iconName="account-outline"
              label="Last Name"
              value={lname}
              placeholder="Enter your last name"
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
                {moment(new Date(date)).format("MMMM d YYYY") ===
                moment(new Date()).format("MMMM d YYYY") ? (
                  <Text
                    style={{
                      color: COLORS.grey,
                      alignSelf: "center",
                      fontSize: 22,
                    }}
                  >
                    Select date
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: COLORS.grey,
                      alignSelf: "center",
                      fontSize: 22,
                    }}
                  >
                    {moment(new Date(date)).format("MMMM Do YYYY")}
                  </Text>
                )}
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
              autoCapitalize="none"
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
    color: "rgb(119,136,153)",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  formlable: {
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
