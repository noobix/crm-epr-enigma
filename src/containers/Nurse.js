import React from "react";

class NurseContainer extends React.Component {
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
            name="ssage"
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
export { NurseContainer };
