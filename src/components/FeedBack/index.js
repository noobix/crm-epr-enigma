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
import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import moment from "moment";

const FeedBack = (props) => {
  const [dataset, setdataset] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    setdataset([]);
    getCases();
  }, [isFocused]);
  async function getCases() {
    const itemstore = collection(firestore, "case");
    const item = query(itemstore, where("uid", "==", props.route.params.uid));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      notify(doc.id, obj);
      // setdataset((dataset) => [{ ...obj, id: doc.id }, ...dataset]);
    });
  }
  const feedbackvalidity = (
    status,
    doctor,
    date,
    casetype,
    id,
    notification,
    noteId
  ) => {
    if (status === "Close") {
      return;
    }
    props.navigation.navigate("feedbackform", {
      status,
      doctor,
      date,
      casetype,
      id,
      notification,
      noteId,
      name: props.route.params.name,
    });
  };
  const notify = async (id, data) => {
    const itemstore = collection(firestore, "status");
    const item = query(
      itemstore,
      where("name", "==", props.route.params.name),
      where("id", "==", id),
      where("status", "==", "unread")
    );
    const querySnapshot = await getDocs(item);
    if (querySnapshot.empty) {
      additionalcases(data.uid, id);
    }
    const dom = new Array();
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      const newdata = {
        id: id,
        casetype: data.casetype,
        date: data.date,
        diagnosis: data.diagnosis,
        name: data.name,
        doctor: data.doctor,
        status: data.status,
        uid: data.uid,
        notification: obj.status,
        noteId: doc.id,
      };
      const exist = dom.some((o) => o.id === id);
      if (!exist) dom.push(newdata);
    });
    for (let i = 0; i < dom.length; i++) {
      setdataset((dataset) => [...dataset, dom[i]]);
    }
  };
  async function additionalcases(uid, id) {
    const docRef = doc(firestore, "case", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const obj = docSnap.data();
      setdataset((dataset) => [
        ...dataset,
        {
          id: id,
          casetype: obj.casetype,
          date: obj.date,
          diagnosis: obj.diagnosis,
          name: obj.name,
          doctor: obj.doctor,
          status: obj.status,
          uid: obj.uid,
          notification: null,
          noteId: null,
        },
      ]);
    }
  }
  const rendercaselist = (
    casetype,
    date,
    doctor,
    status,
    id,
    index,
    notification,
    noteId
  ) => (
    <TouchableOpacity
      key={index}
      onPress={() =>
        feedbackvalidity(
          status,
          doctor,
          date,
          casetype,
          id,
          notification,
          noteId
        )
      }
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
                fontSize: 20,
                letterSpacing: 4,
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
              .sort(
                (a, b) =>
                  new moment(new Date(a.date)).format("YYYYMMDD HHmmss") <
                  new moment(new Date(b.date)).format("YYYYMMDD HHmmss")
              )
              .sort((a, b) => b.status.localeCompare(a.status))
              .map(
                (
                  { casetype, date, doctor, status, id, notification, noteId },
                  index
                ) =>
                  rendercaselist(
                    casetype,
                    date,
                    doctor,
                    status,
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
