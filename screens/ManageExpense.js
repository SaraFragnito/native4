import { View, StyleSheet } from "react-native"
import { useLayoutEffect, useContext, useState } from "react"
import IconButton from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expenses-context"
import ExpenseForm from "../components/ManageExpense/ExpenseForm"
import { deleteExpense, storeExpense, updateExpense } from "../util/http"
import LoadingOverlay from "../components/UI/LoadingOverlay"
import ErrorOverlay from "../components/UI/ErrorOversaly"

function ManageExpenses({route, navigation}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState()
  const expensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId // entra in expenseId solo se esiste params
  const isEditing = !!editedExpenseId // !! converte un valore in un booleano 
  const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => { //navigation.setOptions va sempre messo dentro useEffect o useLayoutEffect
    navigation.setOptions({ title: isEditing ? "Edit Expense" : "Add Expense" })
  }, [navigation, isEditing])
  
  const cancelHandler = () => navigation.goBack()

  async function deleteExpenseHandler(){
    setIsSubmitting(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack() // automaticamente setta isSubmitting su false
    } catch (error) {
      setError("Could not delete expense - please try again later")
      setIsSubmitting(false)
    }
  }

  async function confirmHandler(expenseData){
    setIsSubmitting(true)
    try {
      if (isEditing){
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({...expenseData, id: id})
      }
      navigation.goBack()
    } catch (error) {
      setError("Could not save data - please try again later")
      setIsSubmitting(false)
    }
  }

  if(error && !isSubmitting) return <ErrorOverlay message={error} />

  if (isSubmitting) return <LoadingOverlay />

  return (
  <View style={styles.container}>
    <ExpenseForm 
      onCancel={cancelHandler} 
      onSubmit={confirmHandler} 
      submitButtonLabel={isEditing ? "Update" : "Add"}
      defaultValues={selectedExpense} 
    />

    {isEditing && (
      <View style={styles.deleteContainer}>
        <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
      </View>
    )}
    </View>
  )
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  }
})