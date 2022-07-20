import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GetStarted } from "../components/GetStarted";
import { PatientHome } from "../components/PatientHome";
import { DoctorHome } from "../components/DoctorHome";
import { NurseHome } from "../components/NurseHome";
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
          <NativeStack.Screen name="patienthome" component={PatientHome} />
          <NativeStack.Screen name="doctorhome" component={DoctorHome} />
          <NativeStack.Screen name="nursehome" component={NurseHome} />
        </NativeStack.Navigator>
      </React.Fragment>
    );
  }
}
export { LoginContainer };
