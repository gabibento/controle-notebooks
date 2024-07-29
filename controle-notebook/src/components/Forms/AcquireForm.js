import React from 'react'
import useHistoryForm from './useHistoryForm'

const AcquireForm = () => {

  const { history, handleOnChange, handleOnSubmit} = useHistoryForm();

  return (
    <form onSubmit={handleOnSubmit}>
      
    <label htmlFor="collaborator">Colaborador</label>
    <input
      id="collaborator"
      name="collaborator"
      type="text"
      value={history.collaborator}
      onChange={handleOnChange}
    />

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

export default AcquireForm