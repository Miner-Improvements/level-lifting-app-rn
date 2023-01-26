import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Provider as StoreProvider, useSelector } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { persistor, RootState, store } from "./store";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import { PersistGate } from "redux-persist/integration/react";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./themes";
import CustomNavigationBar from "./components/CustomNavBar";
import WorkoutScreen from "./screens/WorkoutScreen";
import { WorkoutData } from "./reducers/workoutsReducer";

type RootStackParamList = {
  Home: undefined;
  Workout: { workout: WorkoutData };
};
export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const UI = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider theme={theme.theme}>
      <NavigationContainer theme={theme.theme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: (props) => <CustomNavigationBar {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Workout"
            component={WorkoutScreen}
            options={{ animation: "slide_from_right", title: "Workout" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UI />
      </PersistGate>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
