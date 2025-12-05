import { RootStackParamList } from "@/App";
import Button from "@/components/UI/Button";
import IconButton from "@/components/UI/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { ExpensesContext } from "@/store/Expenses-context";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

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
  const expensesCt = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  function deleteExpenseHandler() {
    if(editedExpenseId){
       expensesCt.deleteExpense({id:editedExpenseId})
    }
    navigation.goBack()
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {}

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button onPress={cancelHandler} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}
export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
