import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Octicons,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const DoctorHome = () => {
  const [search, setsearch] = useState("");
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userdetails}>
            <View>
              <Text style={styles.grettingtext}>Welcome</Text>
              <Text style={styles.doctornametext}>Dr. Sylvania Brown</Text>
            </View>
            <Image
              style={styles.profileimg}
              source={{
                uri: "https://images.pexels.com/photos/7447008/pexels-photo-7447008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              }}
            />
          </View>
          <View style={styles.menu}>
            <TextInput
              placeholder="Search patients here"
              style={styles.searchinput}
              value={search}
              onChangeText={(text) => setsearch(text)}
            />
            <Octicons
              style={{
                position: "absolute",
                top: 6,
                left: 6,
                marginLeft: 20,
              }}
              name="search"
              size={37}
              color="black"
            />
          </View>
          <View style={styles.middle}>
            <View style={styles.menulist}>
              <TouchableWithoutFeedback>
                <View style={styles.iconmenu}>
                  <Image
                    style={styles.imgicon}
                    source={require("../../assets/images/medical-record.png")}
                  />
                  <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                    Clinics
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.iconmenu}>
                  <Image
                    style={styles.imgicon}
                    source={require("../../assets/images/medical-team.png")}
                  />
                  <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                    Events
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.iconmenu}>
                  <Image
                    style={styles.imgicon}
                    source={require("../../assets/images/patient.png")}
                  />
                  <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                    Admissions
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.patient}>
            <TouchableWithoutFeedback>
              <View style={styles.careperson}>
                <Image
                  style={styles.careimg}
                  source={require("../../assets/images/examination.png")}
                />
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  Your Patient
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={styles.careperson}>
                <Image
                  style={styles.careimg}
                  source={require("../../assets/images/surgery-room.png")}
                />
                <Text style={{ alignSelf: "center", fontWeight: "bold" }}>
                  Operating Room
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.appointment}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons
              style={{ alignSelf: "flex-end", paddingTop: 10 }}
              name="notifications-none"
              size={30}
              color="black"
            />
            <Text style={styles.appointmenttext}>
              16 appointments to be seen today
            </Text>
          </View>
          <TouchableWithoutFeedback>
            <View style={styles.appointmentbtn}>
              <Text style={{ fontSize: 16, color: "rgb(255,255,255)" }}>
                <AntDesign name="calendar" size={24} color="rgb(255,255,255)" />{" "}
                Today, Between{" "}
                <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="rgb(255,255,255)"
                />{" "}
                8:30 am - 2:00 pm
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.schedulebtn}>
              <Text style={{ fontSize: 16, color: "rgb(255,255,255)" }}>
                <AntDesign name="calendar" size={24} color="rgb(255,255,255)" />{" "}
                Schedule a patient{" "}
                <MaterialCommunityIcons
                  name="clock-time-eight-outline"
                  size={24}
                  color="rgb(255,255,255)"
                />{" "}
                for time range
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { DoctorHome };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
  },
  middle: {
    flex: 1,
  },
  grettingtext: {
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 5,
  },
  doctornametext: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 5,
  },
  profileimg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 5,
  },
  userdetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgb(255,255,255)",
    // marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 70,
  },
  menu: {
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    alignItems: "center",
  },
  searchinput: {
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 5,
    width: 320,
    height: 40,
    paddingLeft: 40,
    fontSize: 22,
    borderRadius: 8,
  },
  menulist: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  iconmenu: {
    borderWidth: 1,
    width: 110,
    height: 145,
    borderColor: "rgb(225,225,225)",
  },
  imgicon: {
    marginBottom: 15,
    width: 100,
    height: 110,
    alignSelf: "center",
  },
  patient: {
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    // width: 330,
    // height: 150,
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    marginBottom: 50,
    marginLeft: 10,
  },
  careimg: {
    width: 130,
    height: 120,
  },
  careperson: {
    borderColor: "rgb(225,225,225)",
    borderWidth: 1,
    width: 140,
    height: 140,
    marginVertical: 5,
  },
  appointment: {
    // flex: 1,
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 3,
    borderRadius: 10,
    width: 330,
    height: 180,
  },
  appointmenttext: {
    color: "rgb(128,128,128)",
    fontSize: 22,
    paddingTop: 10,
    fontWeight: "500",
    position: "relative",
  },
  appointmentbtn: {
    width: 290,
    height: 50,
    backgroundColor: "rgb(109, 123, 175)",
    color: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    position: "absolute",
    right: 10,
    bottom: 70,
  },
  schedulebtn: {
    width: 290,
    height: 50,
    backgroundColor: "rgb(109, 123, 175)",
    color: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    position: "absolute",
    right: 10,
    bottom: 0,
  },
});
