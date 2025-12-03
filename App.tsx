import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from "react-native";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses}/>
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses}/>
    </BottomTabs.Navigator>
  )
}


export default function App() {
  return (
    <>
      <StatusBar barStyle={"dark-content"}/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ExpensesOverView'>
          <Stack.Screen name="ExpensesOverView" component={ExpensesOverview}/>
          <Stack.Screen name="ManageExpense" component={ManageExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}