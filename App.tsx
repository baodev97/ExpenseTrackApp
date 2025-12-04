import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "react-native";
import IconButton from "./components/UI/IconButton";
import { GlobalStyles } from "./constants/styles";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";

export type BottomTabsParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

export type RootStackParamList = {
  ExpensesOverview: NavigatorScreenParams<BottomTabsParamList>;
  ManageExpense: {expenseId:string}|undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<BottomTabsParamList>();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.getParent()?.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ExpensesOverview"
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpenses} options={{
            presentation:'modal'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
