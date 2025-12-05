import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "@/store/Expenses-context";
import { useContext } from "react";

function RecentExpenses() {

  const expensesCt = useContext(ExpensesContext)
  return <ExpensesOutput expensePeriod="Last 7 Day" expenses={expensesCt.expenses} />;
}
export default RecentExpenses;
