import { FlatList, Text } from "react-native"
import ExpenseItem from "./ExpenseItem"

const renderExpenseItem = (itemData) => <ExpenseItem {...itemData.item} />

function ExpensesList(props){
  return ( 
      <FlatList data={props.expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  )
}

export default ExpensesList