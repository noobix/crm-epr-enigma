import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GetStarted } from "../components/GetStarted";
import { Login } from "../components/Login";
import { Registeration } from "../components/Registeration";

const NativeStack = createNativeStackNavigator();
class LoginContainer extends React.Component {
  render() {
    //const userType = useselector(state => state.user.usertype)
    return (
      <React.Fragment>
        <NativeStack.Navigator screenOptions={{ headerShown: false }}>
          <NativeStack.Screen name="getstarted" component={GetStarted} />
          <NativeStack.Screen name="login" component={Login} />
          <NativeStack.Screen
            name="registerpatient"
            component={Registeration}
          />
        </NativeStack.Navigator>
      </React.Fragment>
    );
  }
}
export { LoginContainer };
