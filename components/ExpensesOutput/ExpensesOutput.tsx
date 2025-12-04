import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

type ExpensesOutputProp = {
    expenses: any
}

function ExpensesOutput ({expenses}:ExpensesOutputProp){
    return (
        <View>
            <ExpensesSummary/>
            <ExpensesList/>
        </View>
    )
}
export default ExpensesOutput;