import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Octicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const PatientHome = () => {
  const [search, setsearh] = useState("");
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.userdetails}>
          <View>
            <Text style={styles.grettingtext}>Hello</Text>
            <Text style={styles.usernametext}>Kofi Amoako</Text>
          </View>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            style={styles.profileimg}
          />
        </View>
        <View style={styles.menu}>
          <TextInput
            placeholder="Search medical issue here"
            style={styles.searchinput}
            value={search}
            onChangeText={(text) => setsearh(text)}
          />
          <Octicons
            style={{
              position: "absolute",
              top: 5,
              left: 5,
              backgroundColor: "rgb(225,225,225)",
            }}
            name="search"
            size={39}
            color="black"
          />
          <View style={styles.menulist}>
            <TouchableWithoutFeedback>
              <View style={styles.iconmenu}>
                <Image
                  style={styles.imgicon}
                  source={require("../../assets/images/medicine.png")}
                />
                <Text style={{ alignSelf: "center" }}>Medication</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.iconmenu}>
                <Image
                  style={styles.imgicon}
                  source={require("../../assets/images/medical-checkup.png")}
                />
                <Text style={{ alignSelf: "center" }}>Complaints</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.iconmenu}>
                <Image
                  style={styles.imgicon}
                  source={require("../../assets/images/healthcare.png")}
                />
                <Text style={{ alignSelf: "center" }}>Feedback</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.iconmenu}>
                <Image
                  style={styles.imgicon}
                  source={require("../../assets/images/report.png")}
                />
                <Text style={{ alignSelf: "center" }}>Treatment</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.carepeople}>
          <TouchableWithoutFeedback>
            <View style={styles.careperson}>
              <Image
                style={styles.careimg}
                source={require("../../assets/images/doctor.png")}
              />
              <Text style={{ alignSelf: "center" }}>Your Doctor</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.careperson}>
              <Image
                style={styles.careimg}
                source={require("../../assets/images/nurse.png")}
              />
              <Text style={{ alignSelf: "center" }}>Your Nurse</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.appointment}>
          <Text style={styles.appointmenttext}>Your next appointment</Text>
          <View style={styles.doctorprofile}>
            <Image
              style={styles.profileimg}
              source={{
                uri: "https://images.pexels.com/photos/7447008/pexels-photo-7447008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
            />
            <View>
              <Text style={styles.doctornametext}>Dr Sylvania Brown</Text>
              <Text style={{ fontSize: 17, color: "rgb(128,128,128)" }}>
                General Physician
              </Text>
              <TouchableWithoutFeedback>
                <View style={styles.appointmentbtn}>
                  <Text style={{ fontSize: 16, color: "rgb(255,255,255)" }}>
                    <AntDesign
                      name="calendar"
                      size={24}
                      color="rgb(255,255,255)"
                    />{" "}
                    Wednesday 26,October{" "}
                    <MaterialCommunityIcons
                      name="clock-time-eight-outline"
                      size={24}
                      color="rgb(255,255,255)"
                    />{" "}
                    12:00 am
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { PatientHome };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgb(225,225,225)",
    width: window.width,
    height: window.height,
  },
  grettingtext: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 5,
  },
  usernametext: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 5,
  },
  profileimg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 5,
    marginTop: 5,
  },
  userdetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 5,
    borderRadius: 10,
    width: 330,
    height: 70,
  },
  menu: {
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 160,
  },
  searchinput: {
    backgroundColor: "rgb(225,225,225)",
    marginHorizontal: 5,
    marginVertical: 5,
    width: 320,
    height: 40,
    paddingLeft: 40,
    fontSize: 22,
  },
  imgicon: {
    width: 75,
    height: 80,
    alignSelf: "center",
  },
  iconmenu: {
    borderColor: "rgb(225,225,225)",
    borderWidth: 1,
  },
  menulist: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  carepeople: {
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 145,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  careimg: {
    width: 120,
    height: 120,
  },
  careperson: {
    borderColor: "rgb(225,225,225)",
    borderWidth: 1,
    width: 130,
    height: 137,
    marginVertical: 5,
  },
  appointment: {
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 190,
  },
  appointmenttext: {
    color: "rgb(128,128,128)",
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 10,
    fontWeight: "500",
  },
  doctorprofile: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    position: "relative",
  },
  appointmentbtn: {
    width: 270,
    height: 50,
    backgroundColor: "rgb(109, 123, 175)",
    color: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    position: "absolute",
    right: -50,
    top: 60,
  },
  doctornametext: {
    marginVertical: 5,
    fontSize: 25,
    fontWeight: "500",
  },
});
