import { Text, View } from "react-native";
import { Expense, Expenses } from "./ExpensesOutput";
type ExpensesSummaryProp = {
    priodName:string,
    expenses:Expenses
}

function ExpensesSummary ({priodName, expenses}:ExpensesSummaryProp){
    const expensesSum = expenses.reduce((sum:number,expense:Expense)=>{
        return sum + expense.amount
    },0)

    return (
        <View>
            <Text>{priodName}</Text>
            <Text>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}
export default ExpensesSummary;