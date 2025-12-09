import { Expense } from "@/components/ExpensesOutput/ExpensesOutput";
import { createContext, ReactNode, useReducer } from "react";


type updateExpense = {
  description: string;
  date: Date;
  amount: number;
};

type AddExpenseParams = {
  description: string;
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
  setExpenses:(expenses:Expense[])=>void;
  addExpense: ({ description, date, amount }: AddExpenseParams) => void;
  deleteExpense: ({ id }: DeleteExpenseParams) => void;
  updateExpense: ({ id, expenseData }: updateExpenseParams) => void;
};

type ExpensesContextProviderProp = {
  children: ReactNode;
};

type state = Expense[];
type Action =
  | { type: "ADD"; payload: AddExpenseParams }
  | { type: "REMOVE"; payload: { id: string } }
  | { type: "UPDATE"; payload: updateExpenseParams }
  | {type:"SET",payload:Expense[]}

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  setExpenses:(expenses)=>{},
  addExpense: ({ description, date, amount }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: ({ id, expenseData }) => {},
});

const initialState: state = [];

function expensesReducer(state: state, action: Action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];
    case "SET":
        return action.payload;
    case "REMOVE":
      return state.filter((exp) => exp.id !== action.payload.id);
    case "UPDATE":
      return state.map((exp) =>
        exp.id === action.payload.id
          ? { ...exp, ...action.payload.expenseData }
          : exp
      );
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }: ExpensesContextProviderProp) {
  const [expenses, dispatch] = useReducer(expensesReducer, initialState);
  function addExpense(expenseData: AddExpenseParams) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function deleteExpense(id: DeleteExpenseParams) {
    dispatch({ type: "REMOVE", payload: id });
  }
  function updateExpense({ id, expenseData }: updateExpenseParams) {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  }
  function setExpenses (expenses:Expense[]){
    dispatch({type:"SET",payload:expenses})
  }

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense,deleteExpense,updateExpense,setExpenses}}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
