import React from 'react'
import { db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const History = () => {

    const { id } = useParams()
    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            const historyQuery = query(collection(db, "notebooks", id, "history"), orderBy("date", "desc"))
            const querySnapshot = await getDocs(historyQuery)
            const historyData = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                data.date = data.date.toDate().toLocaleDateString();
                if(data.returnDate){
                    data.returnDate = data.returnDate.toDate().toLocaleDateString();
                }
                historyData.push(data)
            })
            setHistory(historyData)
        }
        fetchHistory()
    }, [id])

  return (
    <div>
        {history.map((doc, index) => (
            <ul key={index}> 
                <p>Retirada:</p>
                <li>{doc.collaborator}</li>
                <li>{doc.date}</li>
                <p>Devolução:</p>
                <li>{doc.returnCollaborator}</li>
                <li>{doc.returnDate}</li>
                <br />
            </ul>
        ))}
    </div>
  )
}

export default History