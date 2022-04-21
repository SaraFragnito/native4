import { View, Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function IconButton(props){
  return (
  <Pressable style={({pressed}) => pressed && styles.pressed} onPress={props.onPress}>
    <View style={styles.buttonContainer}>
      <Ionicons name={props.icon} size={props.size} color={props.color} />
    </View>
  </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75
  }
})