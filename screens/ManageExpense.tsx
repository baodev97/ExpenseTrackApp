import { RootStackParamList } from "@/App";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

type ManageExpensesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ManageExpense"
>;
type ManageExpensesRouteProp = RouteProp<RootStackParamList, "ManageExpense">;

type ManageExpensesProps = {
  navigation: ManageExpensesNavigationProp;
  route: ManageExpensesRouteProp;
};

function ManageExpenses({ route, navigation }: ManageExpensesProps) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  });

  return (
    <View>
      <Text>ManageExpenses</Text>
    </View>
  );
}
export default ManageExpenses;
