import { Text, View } from "react-native";
type ExpensesSummaryProp = {
    priodName:string,
    expenses:any
}

function ExpensesSummary ({priodName, expenses}:ExpensesSummaryProp){
    const expensesSum = expenses.reduce((sum:number,expense:number)=>{
        return sum + expenses.amount
    },0)

    return (
        <View>
            <Text>{priodName}</Text>
            <Text>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}
export default ExpensesSummary;