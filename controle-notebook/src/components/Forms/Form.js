import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Form = ({history, handleOnChange, handleOnSubmit}) => {
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      const querySnapshot = await getDocs(collection(db, "collaborators"));
      const collaboratorsList = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        collaboratorsList.push(docData.name);
      });
      setCollaborators(collaboratorsList);
    };

    fetchCollaborators();
  }, []);

  return (
    <form onSubmit={handleOnSubmit}>
      
    <label htmlFor="collaborator">Nome</label>
    <select name="collaborator" id="collaborator" onChange={handleOnChange} required>
      <option value="">Selecione seu nome</option>
        {collaborators.map((collaborator, index) => (
          <option value={collaborator} key={index}>{collaborator}</option>
        ))}
    </select>

    <label htmlFor="password">Password</label>
    <input 
    id='password'
    name='password'
    type="password"
    required
    />
    
    <button type='submit'>Enviar</button>
    <p>Não possui uma conta? <Link to='/userform'>Clique aqui para criar conta</Link></p>
  </form>
  )
}

export default Form