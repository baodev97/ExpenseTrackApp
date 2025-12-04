import { DUMMY_EXPENSES } from "@/FakeData/Dummy_expenses";
import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

export type Expense = {
    id:string,
    description:string,
    amount:number,
    date:Date
}
export type Expenses = Expense[];


type ExpensesOutputProp = {
    expenses?: Expenses,
    expensePeriod:string
}

function ExpensesOutput ({expenses,expensePeriod}:ExpensesOutputProp){
    return (
        <View>
            <ExpensesSummary priodName={expensePeriod} expenses={DUMMY_EXPENSES}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    )
}
export default ExpensesOutput;