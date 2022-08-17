import { StatusBar } from "expo-status-bar";
import { Router } from "./src/navigation/router";
import { Provider } from "react-redux";
import store, { persistor } from "./src/store";
import { LogBox } from "react-native";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
      <StatusBar style="auto" animated />
    </Provider>
  );
}
