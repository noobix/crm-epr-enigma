import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import { FeedBackForm } from "../FeedBackForm";

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
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <Text>FeedBack</Text>
        <FlatList
          style={styles.list}
          data={dataset
            .sort((a, b) => a.status.localeCompare(b.status))
            .sort((a, b) => (Number(a.date) > Number(b.date) ? 1 : -1))}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item: { status, doctor, date, casetype, id } }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                props.navigation.navigate("feedbackform", {
                  status,
                  doctor,
                  date,
                  casetype,
                  id,
                })
              }
            >
              <View style={styles.grid}>
                <View style={{ flexDirection: "row" }}>
                  <Text>{date}</Text>
                </View>
                <View style={styles.details}>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Doctor</Text>
                    <Text>{doctor}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Status</Text>
                    <Text>{status}</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text>Case Type</Text>
                    <Text>{casetype}</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          ListEmptyComponent={<Text>No Feedback created</Text>}
        />
      </SafeAreaView>
    </React.Fragment>
  );
};
export { FeedBack };
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 0.9,
  },
  grid: {
    flex: 0.3,
    flexDirection: "row",
  },
  details: {
    flexDirection: "column",
  },
});
