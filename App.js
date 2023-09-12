import "react-native-gesture-handler";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Screens/HomeScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import IconHeader from "./components/IconHeader";
import MapScreen from "./Screens/MapScreen";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { auth } from "./config";

const MainStack = createStackNavigator();

export default function App({ route }) {
  // const navigation = useNavigation();
  // const routeName = getFocusedRouteNameFromRoute(route) ?? "Публікації";

  const [fontsLoaded] = useFonts({
    Roboto_400: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_500: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerTitleAlign: "center",
            }}
          >
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />

            <MainStack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />

            <MainStack.Screen
              name="Коментарі"
              component={CommentsScreen}
              options={{
                headerLeft: () => <IconHeader routeName={"Коментарі"} />,
              }}
            />
            <MainStack.Screen
              name="Мапа"
              component={MapScreen}
              options={{
                headerLeft: () => <IconHeader routeName={"Мапа"} />,
              }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
