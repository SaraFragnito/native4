import { View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"

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

function ExpensesOutput(props){
  return ( 
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={props.expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  }
})