import { ExpenseData } from "@/screens/ManageExpense";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../ExpensesOutput/ExpensesOutput";
import Button from "../UI/Button";
import Input from "./Input";


type ExpenseFormState = {
    amount:string,
    date:string,
    description:string
}

type ExpenseFormProps = {
    submitButtonLabel:string,
    onCancel: ()=> void,
    onSubmit:(expenseData:ExpenseData)=>void,
    defaultValues:Expense|undefined
}

function ExpenseForm({onCancel,onSubmit,submitButtonLabel,defaultValues}:ExpenseFormProps) {
    const [inputValues,setInputValues] = useState<ExpenseFormState>({
        amount:defaultValues? defaultValues.amount.toString():'',
        date:defaultValues? defaultValues.date.toISOString().slice(0,10):'',
        description:defaultValues? defaultValues.description:''
    })

  function inputChangeHandler(inputIdentifier:keyof ExpenseFormState,enterValue:string) {
    setInputValues((curInputValues)=>{
        return {
            ...curInputValues,
            [inputIdentifier]:enterValue
        }
    })
  }

  function submitHandler(){
    const expenseData = {
        amount: +inputValues.amount,
        date: new Date(inputValues.date),
        description: inputValues.description
    }
    onSubmit(expenseData)
  }

  return (
    <View style={styles.form}>
        <Text style={styles.title}> Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText:(enterValue)=>inputChangeHandler('amount',enterValue), 
            value:inputValues.amount
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY_MM_DD",
            maxLength: 10,
            onChangeText:(enterValue)=>inputChangeHandler('date',enterValue), 
            value:inputValues.date
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCapitalize: "none", // default sentences
          autoCorrect: false, // defaut true
          onChangeText:(enterValue)=>inputChangeHandler('description',enterValue),
          value:inputValues.description
        }}
      />
      <View style={styles.buttons}>
        <Button onPress={onCancel} mode="flat" style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop:80
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
        marginVertical:16,
        textAlign:'center'
    },
    inputRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    },
    buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})
