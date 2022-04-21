import { View } from "react-native"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"

const DUMMY_EXPENSES = [
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
    amount: 20.50,
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
]

function ExpensesOutput(props){
  return ( 
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={props.expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

export default ExpensesOutput