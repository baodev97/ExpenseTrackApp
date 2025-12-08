import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  function amountChangeHandler() {}

  return (
    <View style={styles.form}>
        <Text style={styles.title}> Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangeHandler,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY_MM_DD",
            maxLength: 10,
            onChangeText: () => {},
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
        }}
      />
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
    }
})
