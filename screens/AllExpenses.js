import { Text } from "react-native"
import ExpensesOutput from "../components/expenses/ExpensesOutput";

function AllExpenses() {
  return <ExpensesOutput expensesPeriod="total" />
}

export default AllExpenses;