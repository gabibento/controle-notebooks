import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import useHistoryForm from './useHistoryForm'
import { db } from '../../firebaseConfig';
import { collection, doc, updateDoc, getDocs, limit, orderBy, query } from "firebase/firestore";

const ReturnForm = () => {

    const { history, handleOnChange } = useHistoryForm();
    const [lastHistory, setLastHistory] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getLastHistory = async (notebookId) => {
      try {
        const historyRef = collection(db, 'notebooks', notebookId, 'history');
       
        const q = query(historyRef, orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
    
        querySnapshot.forEach((doc) => {
          setLastHistory({id: doc.id, ...doc.data()});
        });

        console.log(lastHistory)
    
        
      } catch (e) {
        console.error('Erro ao obter o último histórico: ', e);
       
      }
    }
    useEffect(() => {
      if (id) {
        getLastHistory(id);
      }
    }, [id]);

    const handleOnSubmit = async (e) => {
      e.preventDefault()
    
      console.log(lastHistory)

      if (lastHistory) {
        const notebookRef = doc(db, 'notebooks', id)

        const docRef = doc(notebookRef, 'history', lastHistory.id);
        await updateDoc(docRef, { returnDate: history.returnDate });
        await updateDoc(notebookRef, { available: !history.available });
        console.log('Histórico atualizado com sucesso');
        navigate('/');
        
      } else {
        console.log('Erro: Histórico não encontrado');
      }
    }

  return (
    <form onSubmit={handleOnSubmit}>
     
    <label htmlFor="returnDate">Data</label>
    <input
      id="returnDate"
      name="returnDate"
      type="date"
      value={history.returnDate || ''}
      onChange={handleOnChange}
    />
      <button type='submit'>Enviar</button>
  </form>
  )
}

export default ReturnForm