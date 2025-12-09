import { ExpenseData } from "@/screens/ManageExpense";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Expense } from "../ExpensesOutput/ExpensesOutput";
import Button from "../UI/Button";
import Input from "./Input";

type ExpenseFormState = {
  amount: { value: string; isValid: boolean };
  date: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
};

type ExpenseFormProps = {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: ExpenseData) => void;
  defaultValues: Expense | undefined;
};

function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}: ExpenseFormProps) {
  const [inputs, setInputs] = useState<ExpenseFormState>({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(
    inputIdentifier: keyof ExpenseFormState,
    enterValue: string
  ) {
    setInputs((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enterValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}> Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (enterValue) =>
              inputChangeHandler("amount", enterValue),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY_MM_DD",
            maxLength: 10,
            onChangeText: (enterValue) =>
              inputChangeHandler("date", enterValue),
            value: inputs.date.value,
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
          onChangeText: (enterValue) =>
            inputChangeHandler("description", enterValue),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text>Invalid input values - please check your entered data!</Text>}
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
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 16,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
});
