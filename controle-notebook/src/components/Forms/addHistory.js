import { db } from '../../firebaseConfig';
import { doc, collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

export const addHistory = async (id, history) => {
    try{
        const notebookRef = doc(db, 'notebooks', id);
  
        if(notebookRef){
          const docRef = await addDoc(collection(notebookRef, 'history'), {
            ...history,
            date: serverTimestamp()
          });
          const docId = docRef.id;

          await updateDoc(notebookRef, { available: false })
  
          return docId;
        }else{
          console.log("erro na ref do notebook");
          return null;
        }
        
      }
      catch(e){
        console.log("Error: " + e);
      }
}