import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "@/store/Expenses-context";
import { getDateMinusDays } from "@/util/date";
import { fetchExpense } from "@/util/http";
import { useContext, useEffect } from "react";

function RecentExpenses() {

  const expensesCt = useContext(ExpensesContext)
  useEffect(()=>{
    async function getExpenses(){
      await fetchExpense();
    }
    getExpenses();
  },[])
  const recenntExpenses = expensesCt.expenses.filter((exp) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today,7)
    return exp.date > date7DaysAgo;
  });


  return <ExpensesOutput expensePeriod="Last 7 Day" expenses={recenntExpenses} />;
}
export default RecentExpenses;
 