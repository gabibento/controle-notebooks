import React from 'react'
import useHistoryForm from './useHistoryForm'
import { useContext } from 'react';

const ReturnForm = () => {

    const { history, handleOnChange, handleOnSubmit } = useHistoryForm();

    console.log(history)

  return (
    <form onSubmit={handleOnSubmit}>
     
    <label htmlFor="date">Data</label>
    <input
      id="date"
      name="date"
      type="date"
      value={history.date}
      onChange={handleOnChange}
    />
      <button type='submit'>Enviar</button>
  </form>
  )
}

export default ReturnForm