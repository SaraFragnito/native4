import { View, Text } from "react-native"

function ExpensesSummary(props){
  const expensesSum = props.expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  return ( 
    <View>
      <Text>{props.periodName}</Text>
      <Text>€ {expensesSum.toFixed(2)}</Text>
    </View>
  )
}

export default ExpensesSummary