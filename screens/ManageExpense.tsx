import { RootStackParamList } from "@/App";
import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import IconButton from "@/components/UI/IconButton";
import { GlobalStyles } from "@/constants/styles";
import { ExpensesContext } from "@/store/Expenses-context";
import { storeExpense } from "@/util/http";
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

export type ExpenseData = {
    amount:number,
    date:Date,
    description:string
}


function ManageExpenses({ route, navigation }: ManageExpensesProps) {
  const expensesCt = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCt.expenses.find((expense)=> expense.id === editedExpenseId)

  function deleteExpenseHandler() {
    if (editedExpenseId) {
      expensesCt.deleteExpense({ id: editedExpenseId });
    }
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function  confirmHandler(expenseData:ExpenseData) {
    if(isEditing){
      expensesCt.updateExpense({id:editedExpenseId,expenseData:expenseData})
    }else{
      const id = await storeExpense(expenseData)
      expensesCt.addExpense({...expenseData,id:id})
    }
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  });

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

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
});
