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
  ToastAndroid,
  KeyboardAvoidingView,
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
  onSnapshot,
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
  const [details, setdetails] = useState(false);
  const [feedlist, setfeedlist] = useState([]);
  const [replyset, setreplyset] = useState([]);
  const [name, setname] = useState(props.route.params.name);
  const [mesageinput, setmessageinput] = useState("");
  const [xheight, setxheight] = useState(50);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
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
  const monitoring = query(
    collection(firestore, "status"),
    where("status", "==", "unread"),
    where("name", "==", name)
  );
  const unsubscribe = () => {
    onSnapshot(monitoring, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        showToast("Incoming message");
        if (change.type === "added") {
          console.log("me");
          setfeedlist([]);
          getFeedlist(getreply);
          // handleCancelNotification(change.doc.id);
        }
      });
    });
  };
  useEffect(() => {
    unsubscribe();
  }, []);
  useEffect(() => {
    if (props.route.params.notification === "read") {
      setfeedlist([]);
      getFeedlist(getreply);
    }
    if (props.route.params.notification === "unread") {
      handleCancelNotification();
    }
  }, [isFocused]);
  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
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
        marginRight: 7,
        borderWidth: 1,
        borderColor: "rgb(109, 123, 175)",
        flexBasis: "auto",
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      }}
    >
      <Text style={{ fontSize: 20 }}>{message}</Text>
      <Text
        style={{
          fontSize: 12,
          color: "rgb(109, 123, 175)",
          fontWeight: "600",
          marginTop: 5,
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
        marginLeft: 7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        padding: 15,
      }}
    >
      <Text style={{ fontSize: 20 }}>{message}</Text>
      <Text
        style={{
          fontSize: 12,
          color: "rgb(109, 123, 175)",
          fontWeight: "600",
          marginTop: 5,
        }}
      >
        {moment(new Date(date)).startOf("minutes").fromNow()}
      </Text>
    </View>
  );
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        {!isKeyboardVisible && details ? (
          <View style={styles.moreinfo}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
                marginTop: 5,
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
        ) : !isKeyboardVisible && !details ? (
          <View style={styles.lessinfo}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Ionicons
                style={{ marginLeft: 16 }}
                name="arrow-back"
                size={30}
                color="rgb(47,79,79)"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "500",
                color: "rgb(128,128,128)",
              }}
            >
              Dr. {props.route.params.doctor}
            </Text>
            <TouchableOpacity onPress={() => setdetails(true)}>
              <Ionicons
                style={{ marginRight: 16 }}
                name="information-circle-outline"
                size={30}
                color="rgb(47,79,79)"
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <FlatList
          style={{
            width: "100%",
            height: "70%",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: "rgb(255,255,255)",
          }}
          inverted
          data={[...feedlist]
            .reverse()
            .sort(
              (a, b) =>
                new moment(new Date(a.fdate)).format("YYYYMMDD HHmmss") -
                new moment(new Date(b.fdate)).format("YYYYMMDD HHmmss")
            )}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item: { id, fmessage, fdate, rdate, rmessage } }) => (
            <React.Fragment>
              {rdate && rmessage ? renderreply(rdate, rmessage) : null}
              {renderfeedlist(fdate, fmessage, id)}
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
              width: "85%",
              backgroundColor: "rgb(245,245,245)",
              marginLeft: 10,
              marginTop: 10,
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
              marginTop: 3,
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
    backgroundColor: "rgb(235,235,235)",
  },
  lessinfo: {
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreinfo: {
    height: "15%",
    width: "100%",
  },
});
