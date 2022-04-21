import { FlatList, Text } from "react-native"
import ExpensesItem from "../ExpenseItem"

const renderExpenseItem = (itemData) => <ExpensesItem {...itemData.item} />

function ExpensesList(props){
  return ( 
      <FlatList data={props.expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  )
}

export default ExpensesList