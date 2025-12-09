import { Expense } from "@/components/ExpensesOutput/ExpensesOutput";
import { DUMMY_EXPENSES } from "@/FakeData/Dummy_expenses";
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
  | { type: "UPDATE"; payload: updateExpenseParams };

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: ({ description, date, amount }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: ({ id, expenseData }) => {},
});

const initialState: state = DUMMY_EXPENSES;

function expensesReducer(state: state, action: Action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];
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

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense,deleteExpense,updateExpense}}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
