import { db } from '../../firebaseConfig';
import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export const getHistory = async (notebookId) => {
    const historyRef = collection(db, "notebooks", notebookId, "history")
    const q = query(historyRef, orderBy("createdAt", "desc"), limit(1))
    const querySnapshot = await getDocs(q)
    
}