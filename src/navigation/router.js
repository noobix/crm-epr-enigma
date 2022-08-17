import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginContainer } from "../containers/Login";
import { DoctorContainer } from "../containers/Doctor";
import { NurseContainer } from "../containers/Nurse";
import { PatientContainer } from "../containers/Patient";
import { Profile } from "../components/Profile";
import { FindPatient } from "../components/FindPatient";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { setUser } from "../store/userSlice";
import { CaseEntery } from "../components/CaseEntery";
import { FeedBack } from "../components/FeedBack";
import { FeedBackForm } from "../components/FeedBackForm";

const NativeStack = createNativeStackNavigator();
const Router = () => {
  const { userState, authState } = useSelector((state) => ({
    userState: state._persistedReducer.user,
    authState: state._persistedReducer.auth,
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
        {userState.user && authState.isAuthenticated ? (
          <>
            {userState.userDef === "Doctor" ? (
              <>
                <NativeStack.Screen
                  name="doctorcontainer"
                  component={DoctorContainer}
                />
              </>
            ) : userState.userDef === "Nurse" ? (
              <>
                <NativeStack.Screen
                  name="nursecontainer"
                  component={NurseContainer}
                />
              </>
            ) : userState.userDef === "Patient" ? (
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
  return (
    <NavigationContainer>
      <NativeStack.Navigator screenOptions={{ headerShown: false }}>
        <NativeStack.Screen name="home" children={authNav} />
        <NativeStack.Screen name="profile" component={Profile} />
        <NativeStack.Screen name="findpatient" component={FindPatient} />
        <NativeStack.Screen name="caseentery" component={CaseEntery} />
        <NativeStack.Screen name="feedback" component={FeedBack} />
        <NativeStack.Screen name="feedbackform" component={FeedBackForm} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};
export { Router };
