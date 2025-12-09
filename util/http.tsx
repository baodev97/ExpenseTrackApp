import { ExpenseData } from "@/screens/ManageExpense";
import axios from 'axios';
export function storeExpense(expenseData:ExpenseData){
    axios.post('https://expensetrackapi-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json',expenseData)
}