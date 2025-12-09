import { ExpenseData } from "@/screens/ManageExpense";
import axios from 'axios';

const BACKEND_URL = 'https://expensetrackapi-default-rtdb.asia-southeast1.firebasedatabase.app'
export async function storeExpense(expenseData:ExpenseData){

    const response = await axios.post( BACKEND_URL + '/expenses.json',expenseData)
    const id = response.data.name;
    return id;
}

export async function fetchExpense(){
    const response = await axios.get(BACKEND_URL + '/expenses.json')
    //console.log(response.data,"check respone")
    const expense = []
    for(const key in response.data){
        const expenseObj = {
            id:key,
            amount:response.data[key].amount,
            date:new Date(response.data[key].date),
            description:response.data[key].description
        }
        expense.push(expenseObj)
    }
    return expense
}

