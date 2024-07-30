import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addHistory } from './addHistory';

const useHistoryForm = () => {
  const { id } = useParams();
  const [history, setHistory] = useState({
    collaborator: "",
    date: ""
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setHistory(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(history);

    const docId = await addHistory(id, history);

    console.log("added " + docId);

    navigate('/');
  };

  return {
    history,
    handleOnChange,
    handleOnSubmit
  };
};

export default useHistoryForm;
