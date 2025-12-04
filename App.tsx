import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from "react-native";
import IconButton from './components/UI/IconButton';
import { GlobalStyles } from './constants/styles';
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview(){
  return (
    <BottomTabs.Navigator screenOptions={{
      headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
      headerTintColor:'white',
      tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
      tabBarActiveTintColor:GlobalStyles.colors.accent500,
      headerRight:({tintColor})=> <IconButton icon='add' size={24} color={tintColor} onPress={()=>{}}/>
    }}>
      <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
        title:'Recent Expenses',
        tabBarLabel:'Recent',
        tabBarIcon:({size,color})=>
          <Ionicons  name="hourglass" size={size} color={color}/>
      }}/>
      <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
        title:'All Expenses',
        tabBarLabel:'All Expenses',
        tabBarIcon:({size,color})=>
          <Ionicons  name="calendar" size={size} color={color}/>
      }}/>
    </BottomTabs.Navigator>
  )
}


export default function App() {
  return (
    <>
      <StatusBar barStyle={"light-content"}/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='ExpensesOverView'>
          <Stack.Screen name="ExpensesOverView" component={ExpensesOverview} options={{
            headerShown:false
          }}/>
          <Stack.Screen name="ManageExpense" component={ManageExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}