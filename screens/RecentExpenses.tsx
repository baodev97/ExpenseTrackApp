import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { ExpensesContext } from "@/store/Expenses-context";
import { getDateMinusDays } from "@/util/date";
import { fetchExpense } from "@/util/http";
import { useContext, useEffect, useState } from "react";

function RecentExpenses() {

  const expensesCt = useContext(ExpensesContext)
  const [isFetching,setIsFetching] = useState(true);
  useEffect(()=>{
    async function getExpenses(){
      setIsFetching(true);
      const expenses = await fetchExpense();
      setIsFetching(false)
      expensesCt.setExpenses(expenses)
    }
    getExpenses();
  },[])
  const recenntExpenses = expensesCt.expenses.filter((exp) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today,7)
    return exp.date > date7DaysAgo;
  });

  if(isFetching){
    return <LoadingOverlay/>
  }

  return <ExpensesOutput expensePeriod="Last 7 Day" expenses={recenntExpenses} />;
}
export default RecentExpenses;
 