import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { saveDoctorReply } from "../../store/feedbackSlice";

const ReplyFeedback = (props) => {
  const [dataset, setdataset] = useState([]);
  const [replyset, setreplyset] = useState([]);
  const [reply, setreply] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getfeedback(getreply);
  }, []);
  async function getreply(id) {
    const itemstore = collection(firestore, "feedreply");
    const item = query(itemstore, where("id", "==", id));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setreplyset((replyset) => [obj, ...replyset]);
    });
  }
  async function getfeedback(func) {
    const itemstore = collection(firestore, "feedback");
    const item = query(itemstore, where("id", "==", props.route.params.id));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setdataset((dataset) => [
        { ...obj, name: props.route.params.name, id: doc.id },
        ...dataset,
      ]);
      func(doc.id);
    });
  }
  const handleSaveReply = (id) => {
    const rMessage = {
      message: reply,
      id: id,
    };
    dispatch(saveDoctorReply(rMessage));
    props.navigation.navigate("caselist");
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.listarea}>
          <FlatList
            data={dataset}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={({ item: { name, message, date, id } }) => (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Name</Text>
                  <Text>{name}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Date</Text>
                  <Text>{date}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text>Message</Text>
                  <Text>{message}</Text>
                </View>
                <ScrollView>
                  {replyset ? (
                    replyset
                      .filter((item) => item.id === id)
                      .map(({ message, date }, index) => (
                        <View key={index}>
                          <Text>{message}</Text>
                          <Text>{date}</Text>
                        </View>
                      ))
                  ) : (
                    <>
                      <TextInput
                        style={{ borderWidth: 1, borderBottomColor: "blue" }}
                        onChangeText={(text) => setreply(text)}
                      />
                      <TouchableWithoutFeedback
                        onPress={() => handleSaveReply(id)}
                      >
                        <View
                          style={{
                            backgroundColor: "blue",
                            width: 90,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: "white" }}>Reply</Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </>
                  )}
                </ScrollView>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export { ReplyFeedback };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(225,225,225)",
    justifyContent: "center",
    alignItems: "center",
  },
  listarea: {
    width: "90%",
    height: "95%",
    backgroundColor: "rgb(255,255,255)",
  },
});
