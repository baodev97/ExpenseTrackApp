import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

type ExpensesOutputProp = {
    expenses: any,
    expensePeriod:string
}

function ExpensesOutput ({expenses,expensePeriod}:ExpensesOutputProp){
    return (
        <View>
            <ExpensesSummary priodName={expensePeriod} expenses={expenses}/>
            <ExpensesList/>
        </View>
    )
}
export default ExpensesOutput;