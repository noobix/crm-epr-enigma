import { StatusBar } from "expo-status-bar";
import { Router } from "./src/navigation/router";
import { Provider } from "react-redux";
import store from "./src/store";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" animated />
      <Router />
    </Provider>
  );
}
