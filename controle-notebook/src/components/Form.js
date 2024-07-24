import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'

import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Form = () => {

  const {id} = useParams();
  const [historic, setHistoric] = useState({
    collaborator: "",
    date: ""
  })


  const addHistoric = async () => {
    try{
      const notebookRef = doc(db, 'notebooks', id);

      if(notebookRef){
        await addDoc(collection(notebookRef, 'historic'), historic)
        console.log("added")
      }else{
        console.log("erro na ref do notebook")
      }
      
    }
    catch(e){
      console.log("Error: " + e)
    }
  }

  const handleOnChange = (e, key) => {
    e.preventDefault()
    setHistoric({...historic, [key]: e.target.value})
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(historic)

    addHistoric();

  }

  return (
    <form onSubmit={handleOnSubmit}>
      
        <label htmlFor="collaborator">Colaborador</label>
        <input onChange={(e) => handleOnChange(e, 'collaborator')} type="text" />

        <label htmlFor="date">Data</label>
        <input onChange={(e) => handleOnChange(e, 'date')} type="date" />

        <button type='submit'>Enviar</button>
    </form>
  )
}

export default Form