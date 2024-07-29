import React from 'react'
import useHistoryForm from './useHistoryForm'
import { db } from '../../firebaseConfig';
import { collection, doc, getDocs, limit, orderBy, query } from "firebase/firestore";

const ReturnForm = () => {

    const { history, handleOnChange, handleOnSubmit } = useHistoryForm();

    const getLastHistory = async (notebookId) => {
      try {
        const historyRef = collection(db, 'notebooks', notebookId, 'history');
        // Ordenar por timestamp e limitar a um resultado
        const q = query(historyRef, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
    
        let lastHistory = null;
        querySnapshot.forEach((doc) => {
          lastHistory = { id: doc.id, ...doc.data() };
        });
    
        return lastHistory;
      } catch (e) {
        console.error('Erro ao obter o último histórico: ', e);
        return null;
      }
    }

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