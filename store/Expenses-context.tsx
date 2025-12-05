import { Expense } from "@/components/ExpensesOutput/ExpensesOutput";
import { createContext, ReactNode, useReducer } from "react";

type updateExpense = {
  decription: string;
  date: Date;
  amount: number;
};

type AddExpenseParams = {
  decription: string;
  date: Date;
  amount: number;
};
type DeleteExpenseParams = {
  id: string;
};
type updateExpenseParams = {
  id: string;
  expenseData: updateExpense;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense?: ({ decription, date, amount }: AddExpenseParams) => void;
  deleteExpense?: ({ id }: DeleteExpenseParams) => void;
  updateExpense?: ({ id, expenseData }: updateExpenseParams) => void;
};

type ExpensesContextProviderProp = {
  children: ReactNode;
};

type state = {
    expenses:Expense[]
}
type Action =
  | { type: "ADD"; payload: AddExpenseParams }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE"; payload: updateExpenseParams };

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: ({ decription, date, amount }) => {},
  deleteExpense: ({id}) => {},
  updateExpense: ({id,expenseData}) => {},
});

const initialState: state = {
  expenses: [],
};

function expensesReducer(state:state,action:Action){
    switch (action.type) {
        case "ADD":
        case "REMOVE":
        case "UPDATE":
        default:
            return state
    }
}



function ExpensesContextProvider({ children }: ExpensesContextProviderProp) {
  const [expenses,dispatch] = useReducer(expensesReducer,initialState);
  function addExpense (expenseData:AddExpenseParams) {
    dispatch({type:"ADD",payload:expenseData})
  }
  function deleteExpense(id:DeleteExpenseParams){
    dispatch({type:"REMOVE",payload:id})
  }
  function updateExpense({id,expenseData}:updateExpenseParams){
    dispatch({type:"UPDATE",payload:{id,expenseData}})
  }

  return (<ExpensesContext.Provider value={expenses}>
    {children}
  </ExpensesContext.Provider>)
}
export default ExpensesContextProvider;
