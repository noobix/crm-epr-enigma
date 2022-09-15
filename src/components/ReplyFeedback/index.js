import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  FlatList,
  Dimensions,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import {
  collection,
  query,
  doc,
  where,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { saveDoctorReply, saveFeedbackStatus } from "../../store/feedbackSlice";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment";

const ReplyFeedback = (props) => {
  const [details, setdetails] = useState(false);
  const [dataset, setdataset] = useState([]);
  const [visible, setvisible] = useState(false);
  const [name, setname] = useState(props.route.params.doctor);
  const [messagereply, setmessagereply] = useState("");
  const [msgid, setmsgid] = useState(null);
  const inputref = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    getfeedback(getreply);
    if (props.route.params.notification === "unread") {
      handleCancelNotification(props.route.params.noteId);
    }
  }, [isFocused]);
  async function getreply(id, feed) {
    const itemstore = collection(firestore, "feedreply");
    const item = query(itemstore, where("id", "==", id));
    const querySnapshot = await getDocs(item);
    if (querySnapshot.empty) {
      supplynoreply(id);
    }
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      setdataset((dataset) => [
        ...dataset,
        {
          id: obj.id,
          fdate: feed.date,
          fmessage: feed.message,
          rdate: obj.date,
          rmessage: obj.message,
        },
      ]);
    });
  }
  async function getfeedback(func) {
    const itemstore = collection(firestore, "feedback");
    const item = query(itemstore, where("id", "==", props.route.params.id));
    const querySnapshot = await getDocs(item);
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      func(doc.id, obj);
    });
  }
  async function supplynoreply(id) {
    const docRef = doc(firestore, "feedback", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
      const noreply = docSnap.data();
      setdataset((dataset) => [
        ...dataset,
        {
          id: docSnap.id,
          fdate: noreply.date,
          fmessage: noreply.message,
          rdate: null,
          rmessage: null,
        },
      ]);
    }
  }
  const monitoring = query(
    collection(firestore, "status"),
    where("status", "==", "unread"),
    where("name", "==", name)
  );
  const unsubscribe = () => {
    onSnapshot(monitoring, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          showToast("Incoming message");
          setdataset([]);
          getfeedback(getreply);
          // handleCancelNotification(change.doc.id);
        }
      });
    });
  };
  useEffect(() => {
    unsubscribe();
  }, []);
  const handleSaveReply = (id) => {
    Keyboard.dismiss();
    if (messagereply.trim() === "") {
      return;
    }
    const rMessage = {
      message: messagereply,
      id: id,
    };
    const statusData = {
      id: props.route.params.id,
      name: props.route.params.name,
      status: "unread",
    };
    dispatch(saveDoctorReply(rMessage));
    dispatch(saveFeedbackStatus(statusData));
    setdataset([]);
    getfeedback(getreply);
    setmessagereply("");
    setvisible(false);
    // props.navigation.navigate("home");
  };
  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const handleCancelNotification = async (id) => {
    const notificationRef = doc(firestore, "status", id);
    await updateDoc(notificationRef, { status: "read" });
  };
  const handelInputsubmit = useCallback(
    (ev) => {
      const input = ev.nativeEvent.text;
      setmessagereply(input);
    },
    [setmessagereply]
  );
  const handleCaseupdate = async () => {
    const caseRef = doc(firestore, "case", props.route.params.id);
    await updateDoc(caseRef, { status: "Close" });
    props.navigation.navigate("caselist");
  };
  function processreply(id) {
    setmsgid(id);
    setvisible(true);
  }
  const renderfeedback = (id, date, message) => (
    <TouchableOpacity
      onPress={() => processreply(id)}
      style={{
        borderWidth: 1,
        marginVertical: 5,
        borderColor: "rgb(225,225,225)",
        backgroundColor: "rgb(245,245,245)",
        flexBasis: "auto",
        padding: 15,
        marginRight: 70,
        marginLeft: 7,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <Text style={{ fontSize: 20 }}>{message}</Text>
      <Text
        style={{
          fontSize: 12,
          color: "rgb(109, 123, 175)",
          fontWeight: "500",
        }}
      >
        {moment(new Date(date)).startOf("minutes").fromNow()}
      </Text>
    </TouchableOpacity>
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
        marginLeft: 70,
        marginRight: 7,
        padding: 15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
      }}
    >
      <View key={"fyt"}>
        <Text style={{ fontSize: 20 }}>{message}</Text>
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
    </View>
  );
  const ModalPopup = ({ visible, children }) => {
    const [showmodal, setshowmodal] = useState(visible);
    const togglemodal = () => {
      if (visible) {
        setshowmodal(true);
      } else {
        setshowmodal(false);
      }
    };
    return (
      <Modal transparent visible={showmodal}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modalContainer}>{children}</View>
        </View>
      </Modal>
    );
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <ModalPopup visible={visible}>
          <View
            style={{
              width: "90%",
              height: "72%",
              backgroundColor: "rgb(255,255,255)",
              borderRadius: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TextInput
                placeholder="Enter Reply"
                ref={inputref}
                multiline
                autoCorrect
                scrollEnabled
                numberOfLines={8}
                autoCapitalize="sentences"
                placeholderTextColor="rgb(0,191,255)"
                defaultValue={messagereply}
                onEndEditing={handelInputsubmit}
                style={{
                  width: "100%",
                  height: 250,
                  fontSize: 20,
                  padding: 20,
                  textAlignVertical: "top",
                  backgroundColor: "rgb(245,245,245)",
                  borderRadius: 30,
                }}
              />
            </View>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgb(109, 123, 175)",
                }}
                onPress={() => setvisible(false)}
              >
                <MaterialIcons
                  name="cancel"
                  size={50}
                  color="rgb(225,225,225)"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSaveReply(msgid)}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgb(109, 123, 175)",
                }}
              >
                <Ionicons name="send" size={40} color="rgb(255,255,255)" />
              </TouchableOpacity>
            </View>
          </View>
        </ModalPopup>
        {details ? (
          <View style={styles.moreinfo}>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
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
              <Ionicons name="person-outline" size={15} color="rgb(47,79,79)" />
              <Text
                style={{
                  fontSize: 16,
                  marginLeft: 15,
                  color: "rgb(128,128,128)",
                }}
              >
                {props.route.params.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 10,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-information-circle-outline"
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
                {props.route.params.diagnosis}
              </Text>
            </View>
          </View>
        ) : (
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
              {props.route.params.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => setdetails(true)}>
                <Ionicons
                  style={{ marginRight: 10 }}
                  name="information-circle-outline"
                  size={30}
                  color="rgb(47,79,79)"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCaseupdate()}>
                <AntDesign
                  name="closecircle"
                  style={{ marginRight: 16 }}
                  size={24}
                  color="rgb(255,69,0)"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <FlatList
          style={{
            flex: 0.6,
            width: "100%",
            height: "70%",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            backgroundColor: "rgb(255,255,255)",
          }}
          inverted
          data={[...dataset]
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
              {renderfeedback(id, fdate, fmessage)}
            </React.Fragment>
          )}
        />
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
    backgroundColor: "rgb(235,235,235)",
  },
  lessinfo: {
    flex: 0.1,
    height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreinfo: {
    flex: 0.15,
    height: "15%",
    width: "100%",
  },
});
