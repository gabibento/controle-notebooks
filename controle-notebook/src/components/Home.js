import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [notebooks, setNotebooks] = useState([]);

  useEffect(() => {
    const fetchNotebooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'notebooks'));
      const notebooksData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        notebooksData.push(data);
      });
      setNotebooks(notebooksData);
    };

    fetchNotebooks();
  }, []);

  return (
    <div>
      {notebooks.map((notebook, key) => (
        <ul key={key}>
          <li className={notebook.available ? styles.available : styles.unavailable}>
            <button>
              <Link to={notebook.available ? `/formacquire/${notebook.id}` : `/formreturn/${notebook.id}`}>{notebook.id}</Link>
            </button>
            <button>
              <Link to={`/history/${notebook.id}`}>Ver histórico</Link>
            </button>
            
          </li>
        </ul>
      ))}
    </div>
  );
};

export default Home;
