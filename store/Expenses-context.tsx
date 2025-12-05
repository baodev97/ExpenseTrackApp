import { Expense } from "@/components/ExpensesOutput/ExpensesOutput";
import { createContext, ReactNode } from "react";

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
  data: updateExpense;
};

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: ({ decription, date, amount }: AddExpenseParams) => void;
  deleteExpense: ({ id }: DeleteExpenseParams) => void;
  updateExpense: ({ id, data }: updateExpenseParams) => void;
};

type ExpensesContextProviderProp = {
  children: ReactNode;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: ({ decription, date, amount }) => {},
  deleteExpense: ({id}) => {},
  updateExpense: ({id,data}) => {},
});



function ExpensesContextProvider({ children }: ExpensesContextProviderProp) {
  

  return (<>
  
  </>)
}
export default ExpensesContextProvider;
