import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginContainer } from "../containers/Login";
import { DoctorContainer } from "../containers/Doctor";
import { NurseContainer } from "../containers/Nurse";
import { PatientContainer } from "../containers/Patient";

const NativeStack = createNativeStackNavigator();
const Router = () => {
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{ headerShown: false }}>
        <NativeStack.Screen name="logincontainer" component={LoginContainer} />
        <NativeStack.Screen
          name="doctorcontainer"
          component={DoctorContainer}
        />
        <NativeStack.Screen name="nursecontainer" component={NurseContainer} />
        <NativeStack.Screen
          name="patientcontainer"
          component={PatientContainer}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};
export { Router };
