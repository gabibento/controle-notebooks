import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import useHistoryForm from './useHistoryForm'
import { db } from '../../firebaseConfig';
import { collection, doc, updateDoc, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import Form from './Form';

const ReturnForm = () => {

    
    const [history, setHistory] = useState({
      collaborator: "",
      date: ""
    });
    const [lastHistory, setLastHistory] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    
    const getLastHistory = async (notebookId) => {
      try {
        const historyRef = collection(db, 'notebooks', notebookId, 'history');
       
        const q = query(historyRef, orderBy('date', 'desc'), limit(1));
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
        await updateDoc(docRef, { returnDate:  serverTimestamp()});
        await updateDoc(notebookRef, { available: !history.available });
        await updateDoc(docRef, { returnCollaborator: history.collaborator})
        console.log('Histórico atualizado com sucesso');
        navigate('/');
        
      } else {
        console.log('Erro: Histórico não encontrado');
      }
    }

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setHistory(prevState => ({ ...prevState, [name]: value }));
    };
  

  return (
    <div>
      <h1>Devolver</h1>
      <Form handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} history={history}></Form>
    </div>
  )
}

export default ReturnForm