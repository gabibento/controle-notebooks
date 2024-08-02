import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Form = ({history, handleOnChange, handleOnSubmit}) => {
  const [collaborators, setCollaborators] = useState([]);
  const [password, setPassword] = useState('')

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

  const validatePassword = (password, collaboratorName) => {
    const collaborator = collaborators.find(c => c.name === collaboratorName);
    return collaborator && collaborator.password === password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(password)
    if (validatePassword(password, history.collaborator)) {
      handleOnSubmit(e);
    } else {
      console.log('Invalid password');
      
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      
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
    value={password}
    onChange={handlePasswordChange}
    required
    />
    
    <button type='submit'>Enviar</button>
    <p>Não possui uma conta? <Link to='/userform'>Clique aqui para criar conta</Link></p>
  </form>
  )
}

export default Form