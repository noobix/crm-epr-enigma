import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { Ionicons, Fontisto } from "@expo/vector-icons";

const FeedBack = (props) => {
  const [dataset, setdataset] = useState([]);
  useEffect(() => {
    getCases();
  }, []);
  async function getCases() {
    const itemstore = collection(firestore, "case");
    const item = query(itemstore, where("uid", "==", props.route.params.uid));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setdataset((dataset) => [{ ...obj, id: doc.id }, ...dataset]);
    });
  }
  const feedbackvalidity = (status, doctor, date, casetype, id) => {
    if (status === "Close") {
      return;
    }
    props.navigation.navigate("feedbackform", {
      status,
      doctor,
      date,
      casetype,
      id,
    });
  };
  const rendercaselist = (casetype, date, doctor, status, id, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => feedbackvalidity(status, doctor, date, casetype, id)}
    >
      <View
        style={{
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderTopColor: "rgb(109, 123, 175)",
          borderBottomColor: "rgb(109, 123, 175)",
          height: 120,
          marginVertical: 10,
          backgroundColor: "rgb(245,245,245)",
          paddingLeft: 10,
          position: "relative",
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ color: "rgb(128,128,128)", fontSize: 20 }}>
            Date of visit
          </Text>
          <Text style={{ fontSize: 20, color: "rgb(47,79,79)" }}> {date}</Text>
        </View>
        <View style={{ marginTop: 5, flexDirection: "row" }}>
          <Fontisto name="doctor" size={30} color="rgb(109, 123, 175)" />
          <Text
            style={{
              color: "rgb(128,128,128)",
              fontSize: 20,
              marginLeft: 5,
            }}
          >
            {doctor}
          </Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={{ color: "rgb(128,128,128)", fontSize: 20 }}>
            {casetype}
          </Text>
        </View>
        <View
          style={{
            transform: [{ rotate: "360deg" }],
            backgroundColor: "rgb(144,238,144)",
            width: 20,
            height: 116,
            position: "absolute",
            right: 1,
          }}
        >
          {status === "Open" ? (
            <Text
              style={{
                color: "blue",
                fontSize: 22,
                letterSpacing: 5,
              }}
            >
              {status}
            </Text>
          ) : (
            <Text
              style={{
                color: "rgb(255,255,255)",
                backgroundColor: "rgb(255,69,0)",
                fontSize: 22,
                letterSpacing: 5,
              }}
            >
              {status}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.feedback}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              style={{ marginLeft: 16 }}
              name="arrow-back"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <Text style={{ fontSize: 30 }}>List of cases</Text>
        </View>
        <ScrollView>
          {dataset &&
            dataset
              .sort((a, b) => a.status.localeCompare(b.status))
              .sort((a, b) => (Number(a.date) > Number(b.date) ? 1 : -1))
              .map(({ casetype, date, doctor, status, id }, index) =>
                rendercaselist(casetype, date, doctor, status, id, index)
              )}
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { FeedBack };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)",
    width: window.width,
    height: window.height,
    position: "relative",
  },
  feedback: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgb(225,225,225)",
    justifyContent: "flex-end",
  },
});
