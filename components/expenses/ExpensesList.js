import { FlatList, Text } from "react-native"

const renderExpenseItem = (itemData) => <Text>{itemData.item.description}</Text>

function ExpensesList(props){
  return ( 
      <FlatList data={props.expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
  )
}

export default ExpensesList