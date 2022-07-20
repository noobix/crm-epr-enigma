import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FeedBack = () => {
  const data = {
    feedback: [
      {
        patient_id: "102022001",
        reportdate: "10-06-2022",
        Diagnosis: "Malaria",
        Drug: "Coaterm",
        medication: "1 Tab every 8hr",
        meal: "after",
        Duration: "3 days",
        status: "Open",
        feeback_date: "12-06-2022",
        feedback: "I feel well only slight joint pains",
      },
    ],
  };
  return <React.Fragment></React.Fragment>;
};
export { FeedBack };
