import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import bg from "../../assets/images/bg.jpg"

const initialState = { title: "", description: "" }

export default function Home({ navigation }) {

  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))

  }

  const handleSubmit = () => {
    let { title, description } = state

    if (!title) return alert("Please add title")

    let formData = { title, description }

    setIsProcessing(true)
    
    setIsProcessing(false)
  }

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={[styles.textWhite, styles.h1]}>Add Todo</Text>

        <View style={styles.row}>
          <TextInput
            label="Title"
            value={state.title}
            onChangeText={value => handleChange("title", value)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            label="Description"
            value={state.description}
            onChangeText={value => handleChange("description", value)}
            multiline={true}
            numberOfLines={6}
          />
        </View>
        <View style={styles.row}>
          <Button mode="contained" color='white' loading={isProcessing} disabled={isProcessing} onPress={handleSubmit}>
            Add Todo
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center"
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center"
  },
  textWhite: {
    color: "white"
  },
  row: {
    marginBottom: 12
  }
})