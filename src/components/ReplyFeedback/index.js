import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
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
import { saveDoctorReply } from "../../store/feedbackSlice";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import moment from "moment";

const ReplyFeedback = (props) => {
  const [dataset, setdataset] = useState([]);
  const [replyset, setreplyset] = useState([]);
  const [visible, setvisible] = useState(null);
  const [messagereply, setmessagereply] = useState("");
  const [msgid, setmsgid] = useState(null);
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
    if (messagereply.trim() === "") {
      return;
    }
    const rMessage = {
      message: messagereply,
      id: id,
    };
    dispatch(saveDoctorReply(rMessage));
    props.navigation.navigate("caselist");
    setvisible(false);
  };
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
        <KeyboardAvoidingView behavior="position">
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
                  multiline
                  autoCorrect
                  scrollEnabled
                  numberOfLines={8}
                  autoCapitalize="sentences"
                  placeholderTextColor="rgb(0,191,255)"
                  onChangeText={(text) => setmessagereply(text)}
                  value={messagereply}
                  blurOnSubmit={false}
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
              <Ionicons name="person-outline" size={30} color="rgb(47,79,79)" />
              <Text
                style={{
                  fontSize: 20,
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
                {props.route.params.diagnosis}
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
        <ScrollView
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="handled"
        >
          {dataset &&
            dataset
              .sort(
                (a, b) =>
                  new moment(new Date(a.date)).format("YYYYMMDD HHmmss") -
                  new moment(new Date(b.date)).format("YYYYMMDD HHmmss")
              )
              .map(({ id, message, date }, index) =>
                renderfeedback(id, message, date, index)
              )}
          <ScrollView keyboardShouldPersistTaps="handled">
            {replyset &&
              replyset
                .sort(
                  (a, b) =>
                    new moment(new Date(a.date)).format("YYYYMMDD HHmmss") -
                    new moment(new Date(b.date)).format("YYYYMMDD HHmmss")
                )
                .filter((item) => item.id !== id)
                .map((item, index) => renderreply(item, index))}
          </ScrollView>
        </ScrollView>
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
    height: "35%",
    backgroundColor: "rgb(225,225,225)",
  },
  replydetails: {
    width: "90%",
    height: "65%",
    backgroundColor: "rgb(255,255,255)",
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
