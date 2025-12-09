import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "@/components/UI/ErrorOverlay";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { ExpensesContext } from "@/store/Expenses-context";
import { getDateMinusDays } from "@/util/date";
import { fetchExpense } from "@/util/http";
import { useContext, useEffect, useState } from "react";

function RecentExpenses() {
  const expensesCt = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string|null>(null);
  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpense();
        expensesCt.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);
  const recenntExpenses = expensesCt.expenses.filter((exp) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return exp.date > date7DaysAgo;
  });
  function errorHandler(){
    setError(null);
  }

  if(error&& !isFetching)return <ErrorOverlay message={error} onConfirm={errorHandler}/>

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput expensePeriod="Last 7 Day" expenses={recenntExpenses} />
  );
}
export default RecentExpenses;
