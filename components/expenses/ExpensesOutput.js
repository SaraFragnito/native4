import { View, StyleSheet } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import ExpensesList from "./ExpensesList"
import ExpensesSummary from "./ExpensesSummary"



function ExpensesOutput(props){
  return ( 
    <View style={styles.container}>
      <ExpensesSummary expenses={props.expenses} periodName={props.expensesPeriod} />
      <ExpensesList expenses={props.expenses} />
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