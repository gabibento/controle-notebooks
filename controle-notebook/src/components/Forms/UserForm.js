import {useState} from 'react'
import { db } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const UserForm = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate  = useNavigate()

    const addUser = async () => {
        try{
            const docRef = await addDoc(collection(db, "collaborators"), {...user});
            const docId = docRef.id;
            return docId;
        }catch(e){
            console.log("Erro ao criar usuário: " + e)
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const docId = await addUser();
        console.log("Usuário criado com sucesso com o id: " + docId)
        navigate('/')
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
      };

  return (
    <div>
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="name">Nome</label>
            <input 
            id='name'
            name='name'
            type="text"
            value={user.name}
            onChange={handleOnChange}
            required />

            <label htmlFor="email">E-mail</label>
            <input 
            id='email'
            name='email'
            type="email" 
            value={user.email}
            onChange={handleOnChange}
            required/>

            <label htmlFor="password">Password</label>
            <input 
            id='password'
            name='password'
            type="password"
            value={user.password} 
            onChange={handleOnChange}
            required/>

            <button type='submit'>Enviar</button>
        </form>
    </div>
  )
}

export default UserForm