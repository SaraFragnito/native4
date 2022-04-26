import { View, StyleSheet, Text, Alert } from "react-native"
import { useState } from "react"
import Input from "./Input"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"

function ExpenseForm(props){
  const [inputValues, setInputValues] = useState({
    amount: props.defaultValues ? props.defaultValues.amount.toString() : "",
    date: props.defaultValues ? getFormattedDate(props.defaultValues.date) : "",
    description:props.defaultValues ? props.defaultValues.description :  ""
  })

  const inputChangeHandler = (inputIdentifier, enteredValue) => setInputValues((curInputValues) => {
    return {...curInputValues, [inputIdentifier]: enteredValue }
  })

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== "Invalid Date"
    const descriptionIsValid = expenseData.description.trim().length > 0

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
      Alert.alert("Invalid input", "Please check your input values")
    } 
    props.onSubmit(expenseData)
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          label="Amount" 
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad", 
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount
          }}
        />
        <Input 
          label="Date" 
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD", 
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date
          }}
        />
      </View>
      <Input 
        label="Description" 
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValues.description
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={props.onCancel}> Cancel </Button>
        <Button style={styles.button} onPress={submitHandler}> {props.submitButtonLabel} </Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center"
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
})