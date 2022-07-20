import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PatientHome } from "../components/PatientHome";
import { AntDesign } from "@expo/vector-icons";
import NotReady from "../components/NotReady";

const BottomTabNav = createBottomTabNavigator();
class PatientContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BottomTabNav.Navigator
          screenOptions={{ headerShown: false, tabBarShowLabel: false }}
        >
          <BottomTabNav.Screen
            name="home"
            component={PatientHome}
            options={{
              tabBarIcon: ({ focused }) => (
                <AntDesign
                  name="home"
                  size={24}
                  style={{ color: focused ? "blue" : "black" }}
                />
              ),
            }}
          />
          <BottomTabNav.Screen
            name="calendar"
            component={NotReady}
            options={{
              tabBarIcon: ({ focused }) => (
                <AntDesign
                  name="calendar"
                  size={24}
                  style={{ color: focused ? "blue" : "black" }}
                />
              ),
            }}
          />
          <BottomTabNav.Screen
            name="message"
            component={NotReady}
            options={{
              tabBarIcon: ({ focused }) => (
                <AntDesign
                  name="message1"
                  size={24}
                  style={{ color: focused ? "blue" : "black" }}
                />
              ),
            }}
          />
          <BottomTabNav.Screen
            name="profile"
            component={NotReady}
            options={{
              tabBarIcon: ({ focused }) => (
                <AntDesign
                  name="user"
                  size={24}
                  style={{ color: focused ? "blue" : "black" }}
                />
              ),
            }}
          />
        </BottomTabNav.Navigator>
      </React.Fragment>
    );
  }
}
export { PatientContainer };
