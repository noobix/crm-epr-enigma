import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginContainer } from "../containers/Login";
import { DoctorContainer } from "../containers/Doctor";
import { NurseContainer } from "../containers/Nurse";
import { PatientContainer } from "../containers/Patient";
import { Profile } from "../components/Profile";
import { FindPatient } from "../components/FindPatient";
import { CaseList } from "../components/CaseEntery/index";
import { FeedBack } from "../components/FeedBack";
import { NewsFeed } from "../components/NewsFeed";
import { FeedBackForm } from "../components/FeedBackForm";
import { ReplyFeedback } from "../components/ReplyFeedback";
import { FetchNotification } from "../components/FetchNotification";
import { ReadFeed } from "../components/NewsFeedRead";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import { setUser } from "../store/userSlice";

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
        <NativeStack.Screen name="newsfeed" component={NewsFeed} />
        <NativeStack.Screen name="findpatient" component={FindPatient} />
        <NativeStack.Screen name="caselist" component={CaseList} />
        <NativeStack.Screen name="feedback" component={FeedBack} />
        <NativeStack.Screen name="feedbackform" component={FeedBackForm} />
        <NativeStack.Screen name="replyfeedback" component={ReplyFeedback} />
        <NativeStack.Screen
          name="fetchnotification"
          component={FetchNotification}
        />
        <NativeStack.Screen name="readnewsfeed" component={ReadFeed} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
};
export { Router };
