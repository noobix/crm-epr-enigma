import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Keyboard,
} from "react-native";
import { savePatientFeedback } from "../../store/feedbackSlice";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase/config";
import moment from "moment";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const FeedBackForm = (props) => {
  const [feedlist, setfeedlist] = useState([]);
  const [replyset, setreplyset] = useState([]);
  const [mesageinput, setmessageinput] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const dispatch = useDispatch();
  const handleSaveFeedback = () => {
    if (mesageinput.trim === "") {
      return;
    }
    const feedData = {
      id: props.route.params.id,
      message: mesageinput,
    };
    dispatch(savePatientFeedback(feedData));
    props.navigation.navigate("feedback");
  };
  useEffect(() => {
    getFeedlist(getreply);
  }, []);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
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
  async function getFeedlist(func) {
    const itemstore = collection(firestore, "feedback");
    const item = query(itemstore, where("id", "==", props.route.params.id));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setfeedlist((feedlist) => [...feedlist, obj]);
      func(doc.id);
    });
  }
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        {!isKeyboardVisible ? (
          <React.Fragment>
            <View style={styles.form}>
              <View style={styles.formdetails}>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 10,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="calendar" size={30} color="rgb(47,79,79)" />
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 15,
                      color: "rgb(128,128,128)",
                    }}
                  >
                    {props.route.params.date}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="options" size={30} color="rgb(47,79,79)" />
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 15,
                      color: "rgb(128,128,128)",
                    }}
                  >
                    {props.route.params.casetype}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="doctor"
                    size={30}
                    color="rgb(47,79,79)"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 15,
                      color: "rgb(128,128,128)",
                    }}
                  >
                    {props.route.params.doctor}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginTop: 5,
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="list-status"
                    size={30}
                    color="rgb(47,79,79)"
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 15,
                      color: "rgb(128,128,128)",
                    }}
                  >
                    {props.route.params.status}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Ionicons
                  style={{ marginLeft: 16 }}
                  name="arrow-back"
                  size={30}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ) : null}
        <ScrollView automaticallyAdjustContentInsets={false}>
          {feedlist &&
            feedlist
              .sort((a, b) => (Number(a.date) > Number(b.date) ? 1 : -1))
              .map(({ date, message, id }, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: "rgb(245,245,245)",
                    marginVertical: 5,
                    alignItems: "flex-end",
                    marginLeft: 70,
                    borderWidth: 1,
                    borderColor: "rgb(109, 123, 175)",
                    flexBasis: "auto",
                    padding: 15,
                  }}
                >
                  <Text style={{ fontSize: 25 }}>{message}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "rgb(109, 123, 175)",
                      fontWeight: "500",
                    }}
                  >
                    {moment(date).startOf("minute").fromNow()}
                  </Text>
                </View>
              ))}
          <ScrollView>
            {replyset &&
              replyset
                .sort((a, b) => (Number(a.date) > Number(b.date) ? 1 : -1))
                .filter((item) => item.id !== id)
                .map((item, index) => (
                  <View
                    key={index}
                    style={{
                      borderWidth: 1,
                      borderColor: "rgb(225,225,225)",
                      backgroundColor: "rgb(230,230,250)",
                      flexBasis: "auto",
                      alignItems: "flex-start",
                      marginRight: 70,
                      padding: 15,
                    }}
                  >
                    <Text style={{ fontSize: 25 }}>{item.message}</Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "rgb(109, 123, 175)",
                        fontWeight: "500",
                      }}
                    >
                      {moment(item.date).startOf("minutes").fromNow()}
                    </Text>
                  </View>
                ))}
          </ScrollView>
        </ScrollView>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            autoCorrect
            autoCapitalize="sentences"
            onChangeText={(text) => setmessageinput(text)}
            multiline
            numberOfLines={6}
            scrollEnabled
            style={{
              height: 50,
              width: "90%",
              backgroundColor: "rgb(245,245,245)",
              marginTop: 20,
              fontSize: 20,
              borderWidth: 1,
              borderColor: "rgb(109, 123, 175)",
              padding: 10,
              flexBasis: "auto",
            }}
          />
          <TouchableOpacity
            style={{
              width: "10%",
              height: 50,
              alignItems: "flex-start",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
            onPress={() => handleSaveFeedback()}
          >
            <Feather name="send" size={35} color="rgb(109, 123, 175)" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};
export { FeedBackForm };
const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(255,255,255)",
    position: "relative",
  },
  form: {
    width: "100%",
    height: "35%",
    backgroundColor: "rgb(225,225,225)",
  },
  formdetails: {
    width: "90%",
    height: "65%",
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "rgb(255,255,255)",
  },
});
