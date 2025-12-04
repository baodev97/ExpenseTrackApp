import { View } from "react-native";

type ExpensesOutputProp = {
    expenses: any
}

function ExpensesOutput ({expenses}:ExpensesOutputProp){
    return (
        <View>
            SUMMARY
            LIST OF EXPENSES 
        </View>
    )
}
export default ExpensesOutput;