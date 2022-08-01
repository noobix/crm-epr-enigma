import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GetStarted } from "../components/GetStarted";
import { Login } from "../components/Login";
import { Registeration } from "../components/Registeration";
import { Profile } from "../components/Profile";

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
          <NativeStack.Screen name="profile" component={Profile} />
        </NativeStack.Navigator>
      </React.Fragment>
    );
  }
}
export { LoginContainer };
