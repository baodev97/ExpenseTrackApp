import { FlatList, Text } from "react-native";
import { Expense, Expenses } from "./ExpensesOutput";

type ExpensesListProp = {
  expenses: Expenses;
};

function renderExpenseItem(item: Expense){
    return <Text>{item.description}</Text>
}

function ExpensesList({ expenses }: ExpensesListProp) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => renderExpenseItem(itemData.item)}
    />
  );
}
export default ExpensesList;
