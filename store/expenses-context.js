import { createContext, useReducer } from "react"

const  DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2022-04-21")
  },
  {
    id: "e2",
    description: "T-shirt",
    amount: 9.99,
    date: new Date("2022-01-21")
  },
  {
    id: "e3",
    description: "Fuel",
    amount: 20.55,
    date: new Date("2022-04-20")
  },
  {
    id: "e4",
    description: "Tobacco",
    amount: 6.99,
    date: new Date("2021-03-21")
  },
  {
    id: "e5",
    description: "Book",
    amount: 19.99,
    date: new Date("2021-09-21")
  },
  {
    id: "e6",
    description: "Socks",
    amount: 9.99,
    date: new Date("2020-09-21")
  },
  {
    id: "e7",
    description: "Book",
    amount: 19.99,
    date: new Date("2021-09-23")
  },
  {
    id: "e8",
    description: "Joystick",
    amount: 29.99,
    date: new Date("2021-12-12")
  },
  {
    id: "e9",
    description: "Chair",
    amount: 69.99,
    date: new Date("2021-06-10")
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {},
})

function expensesReducer(state, action){
  switch (action.type){
    case "ADD": 
      const id = new Date().toString() + Math.random().toString()
      return [{...action.payload, id: id}, ...state]
    case "UPDATE": 
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = {...updatableExpense, ...action.payload.data}
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload)
    default: return state
  }
}

function ExpensesContextProvider({children}){
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  const addExpense = (expenseData) => dispatch({ type: "ADD", payload: expenseData })
  const deleteExpense = (id) => dispatch({ type: "DELETE", payload: id })
  const updateExpense = (id, expenseData) => dispatch({ type: "UPDATE", payload: { id: id, data: expenseData} })

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider