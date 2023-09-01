import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";

import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import ProfileScreen from "./ProfileScreen";
import IconNavBottom from "../components/IconNavBottom";
import IconHeader from "../components/IconHeader";

const Tabs = createBottomTabNavigator();

export default function HomeScreen({ route }) {
  const navigation = useNavigation();
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Публікації";

  return (
    <Tabs.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingHorizontal: 75,

          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,

          height: 83,
          background: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <IconHeader name={"logout"} navigation={navigation} />
          ),
          tabBarIcon: () => <IconNavBottom />,
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          headerLeft: () => (
            <IconHeader name={"go-back"} navigation={navigation} />
          ),
          tabBarIcon: () => (
            <IconNavBottom routeName={routeName} name={"Створити публікацію"} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <IconNavBottom
              routeName={routeName}
              name={"Профіль"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
