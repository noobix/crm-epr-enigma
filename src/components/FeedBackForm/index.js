import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
} from "react-native";
import { savePatientFeedback } from "../../store/feedbackSlice";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedBackForm = (props) => {
  const [addfeed, setaddfeed] = useState(false);
  const [feedtext, setfeedtext] = useState("");
  const dispatch = useDispatch();
  const handleSaveFeedback = () => {
    const feedData = {
      id: props.route.params.id,
      message: feedtext,
    };
    dispatch(savePatientFeedback(feedData));
    props.navigation.navigate("feedback");
  };
  return (
    <React.Fragment>
      <SafeAreaView style={styles.container}>
        <View style={styles.details}>
          <Text style={{ textDecorationLine: "underline" }}>Case Details</Text>
          <View style={{ flexDirection: "row" }}>
            <Text>Date:</Text>
            <Text>{props.route.params.date}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Case Type</Text>
            <Text>{props.route.params.casetype}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Doctor:</Text>
            <Text>{props.route.params.doctor}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text>Status:</Text>
            <Text>{props.route.params.status}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => setaddfeed(true)}>
            <View style={styles.button}>
              <Text>Add Feedback</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.form}>
          {addfeed && props.route.params.status === "Open" ? (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text>Enter Feedback</Text>
                <TextInput
                  multiline
                  textAlignVertical="top"
                  numberOfLines={10}
                  scrollEnabled
                  onChangeText={(text) => setfeedtext(text)}
                  placeholder="Enter feedback here"
                  style={{
                    width: 240,
                    height: 350,
                    borderWidth: 1,
                    borderBottomColor: "blue",
                    fontSize: 19,
                  }}
                />
              </View>
              <TouchableWithoutFeedback onPress={() => setaddfeed(false)}>
                <View style={styles.button}>
                  <Text>Cancel</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => handleSaveFeedback()}>
                <View style={styles.button}>
                  <Text>Add Feedback</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : null}
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
    justifyContent: "center",
    alignItems: "center",
    width: window.width,
    height: window.height,
    backgroundColor: "rgb(225,225,225)",
  },
  details: {
    width: "90%",
    height: "30%",
    backgroundColor: "rgb(255,255,255)",
    marginBottom: 3,
  },
  form: {
    backgroundColor: "rgb(255,255,255)",
    width: "90%",
    height: "65%",
  },
  button: {
    backgroundColor: "rgb(108, 90, 255)",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
