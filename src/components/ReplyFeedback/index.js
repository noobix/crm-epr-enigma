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
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import {
  collection,
  query,
  doc,
  where,
  getDocs,
  updateDoc,
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
  const [dataset, setdataset] = useState([]);
  const [replyset, setreplyset] = useState([]);
  const [visible, setvisible] = useState(false);
  const [messagereply, setmessagereply] = useState("");
  const [msgid, setmsgid] = useState(null);
  const inputref = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    getfeedback(getreply);
    if (props.route.params.notification === "unread") {
      handleCancelNotification();
    }
  }, [isFocused]);
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
    setreplyset([]);
    getfeedback(getreply);
    setvisible(false);
    // props.navigation.navigate("home");
  };
  const handleCancelNotification = async () => {
    const notificationRef = doc(firestore, "status", props.route.params.noteId);
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
  const renderfeedback = (id, message, date, index) => (
    <TouchableOpacity
      onPress={() => processreply(id)}
      key={index}
      style={{
        borderWidth: 1,
        marginVertical: 5,
        borderColor: "rgb(225,225,225)",
        backgroundColor: "rgb(245,245,245)",
        flexBasis: "auto",
        padding: 15,
        marginRight: 70,
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
    </TouchableOpacity>
  );
  const renderreply = (item, index) => (
    <View
      key={index}
      style={{
        borderWidth: 1,
        marginVertical: 5,
        borderColor: "rgb(225,225,225)",
        backgroundColor: "rgb(230,230,250)",
        flexBasis: "auto",
        alignItems: "flex-start",
        marginLeft: 70,
        padding: 15,
      }}
    >
      <View key={"fyt"}>
        <Text style={{ fontSize: 25 }}>{item.message}</Text>
        <Text
          style={{
            fontSize: 12,
            color: "rgb(109, 123, 175)",
            fontWeight: "500",
          }}
        >
          {moment(new Date(item.date)).startOf("minutes").fromNow()}
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
        <KeyboardAvoidingView behavior="height">
          <ModalPopup visible={visible}>
            <View
              style={{
                width: "90%",
                height: "72%",
                backgroundColor: "rgb(255,255,255)",
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
                    padding: 10,
                    textAlignVertical: "top",
                    backgroundColor: "rgb(245,245,245)",
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
        </KeyboardAvoidingView>
        <View style={styles.feedbackreply}>
          <View style={styles.replydetails}>
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
                marginTop: 5,
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
        <View
          style={{
            alignSelf: "flex-end",
            marginHorizontal: 5,
            marginTop: 5,
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              height: 35,
              backgroundColor: "rgb(109, 123, 175)",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleCaseupdate()}
          >
            <Text style={{ color: "rgb(255,255,255)", fontSize: 25 }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataset.sort(
            (a, b) =>
              new moment(new Date(a.date)).format("YYYYMMDD HHmmss") -
              new moment(new Date(b.date)).format("YYYYMMDD HHmmss")
          )}
          keyExtractor={(item, index) => {
            return index;
          }}
          renderItem={({ item: { id, message, date } }) => (
            <React.Fragment>
              <ScrollView keyboardShouldPersistTaps="handled">
                {replyset &&
                  replyset
                    .sort(
                      (a, b) =>
                        new moment(new Date(a.date)).format("YYYYMMDD HHmmss") -
                        new moment(new Date(b.date)).format("YYYYMMDD HHmmss")
                    )
                    .filter((item) => item.id === id)
                    .map((item, index) => renderreply(item, index))}
              </ScrollView>
              {renderfeedback(id, message, date)}
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
    backgroundColor: "rgb(255,255,255)",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackreply: {
    width: "100%",
    height: "25%",
    backgroundColor: "rgb(225,225,225)",
  },
  replydetails: {
    width: "100%",
    height: "65%",
    backgroundColor: "rgb(255,255,255)",
    borderBottomRightRadius: 70,
  },
});
