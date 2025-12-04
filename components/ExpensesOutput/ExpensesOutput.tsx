import { GlobalStyles } from "@/constants/styles";
import { DUMMY_EXPENSES } from "@/FakeData/Dummy_expenses";
import { StyleSheet, View } from "react-native";
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
        <View style={styles.container}>
            <ExpensesSummary priodName={expensePeriod} expenses={DUMMY_EXPENSES}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
        </View>
    )
}
export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    }
})