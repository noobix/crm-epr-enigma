import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Keyboard,
  FlatList,
} from "react-native";
import { savePatientFeedback } from "../../store/feedbackSlice";
import { saveFeedbackStatus } from "../../store/feedbackSlice";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  collection,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
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
  const [xheight, setxheight] = useState(50);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  function updatexheight(xheight) {
    setxheight(xheight);
  }
  const handleSaveFeedback = () => {
    Keyboard.dismiss();
    if (mesageinput.trim === "") {
      return;
    }
    const feedData = {
      id: props.route.params.id,
      message: mesageinput,
    };
    const statusData = {
      id: props.route.params.id,
      name: props.route.params.doctor,
      status: "unread",
    };
    dispatch(savePatientFeedback(feedData));
    dispatch(saveFeedbackStatus(statusData));
    setmessageinput("");
    setfeedlist([]);
    getFeedlist(getreply);
    // props.navigation.navigate("home");
  };
  useEffect(() => {
    setfeedlist([]);
    getFeedlist(getreply);
    if (props.route.params.notification === "unread") {
      handleCancelNotification();
    }
  }, [isFocused]);
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
  const handleCancelNotification = async () => {
    const notificationRef = doc(firestore, "status", props.route.params.noteId);
    await updateDoc(notificationRef, { status: "read" });
  };
  async function getreply(id, feed) {
    const itemstore = collection(firestore, "feedreply");
    const item = query(itemstore, where("id", "==", id));
    const querySnapshot = await getDocs(item);
    if (querySnapshot.empty) {
      supplynoreply(id);
    }
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setfeedlist((feedlist) => [
        ...feedlist,
        {
          id: feed.id,
          fdate: feed.date,
          fmessage: feed.message,
          rdate: obj.date,
          rmessage: obj.message,
        },
      ]);
    });
  }
  async function getFeedlist(func) {
    const itemstore = collection(firestore, "feedback");
    const item = query(itemstore, where("id", "==", props.route.params.id));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach(async (doc) => {
      const obj = doc.data();
      // setfeedlist((feedlist) => [...feedlist, obj]);
      func(doc.id, obj);
    });
  }
  async function supplynoreply(id) {
    const docRef = doc(firestore, "feedback", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const noreply = docSnap.data();
      setfeedlist((feedlist) => [
        ...feedlist,
        {
          id: noreply.id,
          fdate: noreply.date,
          fmessage: noreply.message,
          rdate: null,
          rmessage: null,
        },
      ]);
    }
  }
  const renderfeedlist = (date, message, id) => (
    <View
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
        {moment(new Date(date)).startOf("minute").fromNow()}
      </Text>
    </View>
  );
  const renderreply = (date, message) => (
    <View
      style={{
        borderWidth: 1,
        marginVertical: 5,
        borderColor: "rgb(225,225,225)",
        backgroundColor: "rgb(230,230,250)",
        flexBasis: "auto",
        alignItems: "flex-start",
        marginRight: 70,
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
        {moment(new Date(date)).startOf("minutes").fromNow()}
      </Text>
    </View>
  );
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
                  <AntDesign name="calendar" size={15} color="rgb(47,79,79)" />
                  <Text
                    style={{
                      fontSize: 16,
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
                  <Ionicons name="options" size={15} color="rgb(47,79,79)" />
                  <Text
                    style={{
                      fontSize: 16,
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
                    size={15}
                    color="rgb(47,79,79)"
                  />
                  <Text
                    style={{
                      fontSize: 16,
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
                    size={15}
                    color="rgb(47,79,79)"
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 15,
                      color: "rgb(128,128,128)",
                    }}
                  >
                    {props.route.params.status}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={() => props.navigation.goBack()}
              >
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
        <FlatList
          data={feedlist.sort(
            (a, b) =>
              new moment(new Date(a.fdate)).format("YYYYMMDD HHmmss") -
              new moment(new Date(b.fdate)).format("YYYYMMDD HHmmss")
          )}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item: { id, fmessage, fdate, rdate, rmessage } }) => (
            <React.Fragment>
              {renderfeedlist(fdate, fmessage, id)}
              {rdate && rmessage ? renderreply(rdate, rmessage) : null}
            </React.Fragment>
          )}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            autoCorrect
            autoCapitalize="sentences"
            onChangeText={(text) => setmessageinput(text)}
            onContentSizeChange={(e) =>
              updatexheight(e.nativeEvent.contentSize.height)
            }
            multiline
            numberOfLines={6}
            value={mesageinput}
            scrollEnabled
            style={{
              height: xheight,
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
    height: "25%",
    backgroundColor: "rgb(225,225,225)",
  },
  formdetails: {
    width: "100%",
    height: "65%",
    backgroundColor: "rgb(255,255,255)",
    borderBottomRightRadius: 70,
  },
});
