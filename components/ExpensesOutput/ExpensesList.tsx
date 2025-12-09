import { FlatList } from "react-native";
import ExpenseItem from "./ExpenseItem";
import { Expense, Expenses } from "./ExpensesOutput";

type ExpensesListProp = {
  expenses: Expenses;
};

function renderExpenseItem(item: Expense){
    return <ExpenseItem {...item} />
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
