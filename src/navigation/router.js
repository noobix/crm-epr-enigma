import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginContainer } from "../containers/Login";
import { DoctorContainer } from "../containers/Doctor";
import { NurseContainer } from "../containers/Nurse";
import { PatientContainer } from "../containers/Patient";
import { useDispatch, useSelector } from "react-redux";
import { authdata, login } from "../store/authSlice";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { setUser } from "../store/userSlice";

const NativeStack = createNativeStackNavigator();
const Router = () => {
  const userDef = useSelector(() => authdata.userDef);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser);
      } else {
        dispatch(setUser(null));
        dispatch(login(false));
      }
    });
  }, []);
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
