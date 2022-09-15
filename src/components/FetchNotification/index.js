import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firestore } from "../../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  Ionicons,
  MaterialIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";
const FetchNotification = (props) => {
  const [dataset, setdataset] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    setdataset([]);
    fetchnotify();
  }, [isFocused]);
  async function getCaseDetails(item) {
    const docRef = doc(firestore, "case", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const obj = docSnap.data();
      notification(docSnap.id, obj);
      // setdataset((dataset) => [...dataset, obj]);
    }
  }
  async function notification(id, data) {
    const itemstore = collection(firestore, "status");
    const item = query(
      itemstore,
      where("name", "==", data.doctor),
      where("id", "==", id),
      where("status", "==", "unread")
    );
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setdataset((dataset) => [
        ...dataset,
        {
          casetype: data.casetype,
          date: data.date,
          diagnosis: data.diagnosis,
          doctor: data.doctor,
          id: id,
          name: data.name,
          status: data.status,
          uid: data.uid,
          notification: obj.status,
          noteId: doc.id,
        },
      ]);
    });
  }
  async function fetchnotify() {
    const itemstore = collection(firestore, "status");
    const item = query(
      itemstore,
      where("name", "==", props.route.params.name),
      where("status", "==", "unread")
    );
    const querySnapshot = await getDocs(item);
    const arr = new Array();
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      arr.push(obj.id);
    });
    const key = arr.filter((x, i, a) => a.indexOf(x) == i);
    for (let i = 0; i < key.length; i++) {
      getCaseDetails(key[i]);
    }
  }
  const rendercases = (
    status,
    doctor,
    date,
    casetype,
    name,
    diagnosis,
    id,
    index,
    notification,
    noteId
  ) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        props.navigation.navigate("replyfeedback", {
          status,
          diagnosis,
          date,
          casetype,
          id,
          name,
          notification,
          noteId,
          doctor,
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
          position: "relative",
        }}
      >
        {notification === "unread" ? (
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: "rgb(255,69,0)",
              borderRadius: 10,
              position: "absolute",
              right: 30,
              bottom: 50,
            }}
          ></View>
        ) : null}
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
            <Ionicons name="options" size={30} color="rgb(119,136,153)" />
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
            <Fontisto name="date" size={30} color="rgb(119,136,153)" />
            <Text
              style={{
                fontSize: 15,
                alignSelf: "center",
                marginLeft: 3,
              }}
            >
              {moment(new Date(date)).format("dddd MMM Do YY")}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 5, marginLeft: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Fontisto name="doctor" size={30} color="rgb(119,136,153)" />
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
  );
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.notification}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Ionicons
              style={{ marginLeft: 16 }}
              name="arrow-back"
              size={30}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {dataset &&
            dataset
              .sort((a, b) => a.status.localeCompare(b.status))
              .sort(
                (a, b) =>
                  new moment(new Date(a.date)).format("YYYYMMDD HHmmss") -
                  new moment(new Date(b.date)).format("YYYYMMDD HHmmss")
              )
              .map(
                (
                  {
                    status,
                    doctor,
                    date,
                    casetype,
                    name,
                    diagnosis,
                    id,
                    notification,
                    noteId,
                  },
                  index
                ) =>
                  rendercases(
                    status,
                    doctor,
                    date,
                    casetype,
                    name,
                    diagnosis,
                    id,
                    index,
                    notification,
                    noteId
                  )
              )}
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { FetchNotification };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(255,255,255)",
  },
  notification: {
    width: "100%",
    height: "15%",
    backgroundColor: "rgb(225,225,225)",
    justifyContent: "flex-end",
  },
});
