import { db } from '../../firebaseConfig';
import { collection, doc, getDocs, limit, orderBy, query } from "firebase/firestore";

export const getHistory = async (notebookId) => {
    try {
        const historyRef = collection(db, 'notebooks', notebookId, 'history');
      
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