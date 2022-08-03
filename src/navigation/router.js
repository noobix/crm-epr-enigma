import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginContainer } from "../containers/Login";
import { DoctorContainer } from "../containers/Doctor";
import { NurseContainer } from "../containers/Nurse";
import { PatientContainer } from "../containers/Patient";
import { Profile } from "../components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { setUser } from "../store/userSlice";

const NativeStack = createNativeStackNavigator();
const Router = () => {
  const { authState, user } = useSelector((state) => ({
    authState: state.auth,
    user: state.user,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({ ...user.metadata, email: user.email }));
      } else {
        dispatch(setUser(null));
        dispatch(login(false));
      }
    });
  }, []);
  const authNav = () => {
    return (
      <NativeStack.Navigator screenOptions={{ headerShown: false }}>
        {user.user && authState.isAuthenticated ? (
          <>
            {user.userDef === "Doctor" ? (
              <>
                <NativeStack.Screen
                  name="doctorcontainer"
                  component={DoctorContainer}
                />
              </>
            ) : user.userDef === "Nurse" ? (
              <>
                <NativeStack.Screen
                  name="nursecontainer"
                  component={NurseContainer}
                />
              </>
            ) : user.userDef === "Patient" ? (
              <>
                <NativeStack.Screen
                  name="patientcontainer"
                  component={PatientContainer}
                />
              </>
            ) : (
              <NativeStack.Screen
                name="logincontainer"
                component={LoginContainer}
              />
            )}
          </>
        ) : (
          <>
            <NativeStack.Screen
              name="logincontainer"
              component={LoginContainer}
            />
          </>
        )}
      </NativeStack.Navigator>
    );
  };
  const accessoryNav = () => {
    return (
      <NativeStack.Navigator screenOptions={{ headerShown: false }}>
        <NativeStack.Screen name="profile" component={Profile} />
      </NativeStack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{ headerShown: false }}>
        <NativeStack.Screen name="home" children={authNav} />
        <NativeStack.Screen name="accesssory" children={accessoryNav} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};
export { Router };
