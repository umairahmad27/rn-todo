import React, { useState } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import firestore from "@react-native-firebase/firestore"
import firebase from "@react-native-firebase/app"

import bg from "../../assets/images/bg.jpg"
import { useAuthContext } from '../../contexts/AuthContext'

const initialState = { title: "", description: "" }

export default function Home({ navigation }) {

  const { user } = useAuthContext()


  const [state, setState] = useState(initialState)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))

  }

  const handleSubmit = () => {
    let { title, description } = state

    if (!title) return alert("Please add title")

    let formData = { title, description }

    const id = Math.random().toString(36).slice(2)

    formData.id = id
    formData.dateCreated = firebase.firestore.FieldValue.serverTimestamp()
    formData.createdBy = {
      email: user.email,
      uid: user.uid
    }

    setIsProcessing(true)

    firestore().collection('todos').doc(formData.id).set(formData)
      .then(() => {
        alert("Todo has been successfully added.")
      })
      .catch(err => {
        console.error(err)
      })
      .finally(() => {
        setIsProcessing(false)
      })
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