import ExpensesOutput from "@/components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "@/store/Expenses-context";
import { useContext } from "react";

function AllExpenses (){
       const expensesCt = useContext(ExpensesContext);
    return (
        <ExpensesOutput expensePeriod='Total' expenses={expensesCt.expenses}/>
    )
}
export default AllExpenses;