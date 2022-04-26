import { View, StyleSheet, Text } from "react-native"
import { useState } from "react"
import Input from "./Input"
import Button from "../UI/Button"
import { getFormattedDate } from "../../util/date"
import { GlobalStyles } from "../../constants/styles"

function ExpenseForm(props){
  const [inputs, setInputs] = useState({
    amount: {
      value: props.defaultValues ? props.defaultValues.amount.toString() : "",
      isValid: true
    },
    date: {
      value: props.defaultValues ? getFormattedDate(props.defaultValues.date) : "",
      isValid: true
    },
    description: {
      value: props.defaultValues ? props.defaultValues.description :  "",
      isValid: true
    },
  })

  const inputChangeHandler = (inputIdentifier, enteredValue) => setInputs((curInputs) => {
    return {...curInputs, [inputIdentifier]: { value: enteredValue, isValid: true } }
  })

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== "Invalid Date"
    const descriptionIsValid = expenseData.description.trim().length > 0

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: { value: curInputs.description.value, isValid: descriptionIsValid },
        }
      })
      return;
    } 
    props.onSubmit(expenseData)
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          label="Amount" 
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad", 
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value
          }}
        />
        <Input 
          label="Date" 
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD", 
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value
          }}
        />
      </View>
      <Input 
        label="Description" 
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value
        }}
      />

      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>}

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
    alignItems: "center",
    marginTop: 6
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    fontWeight: "bold",
    fontSize: 14,
    margin: 10
  }
})