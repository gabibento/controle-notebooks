import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { addHistory } from './addHistory';
import { HistoryContext } from '../contexts/HistoryContext';

const useHistoryForm = () => {
  const { id } = useParams();
  const [history, setHistory] = useState({
    collaborator: "",
    date: ""
  });
  const { setDocId } = useContext(HistoryContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setHistory(prevState => ({ ...prevState, [name]: value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(history);

    const docId = await addHistory(id, history);
    setDocId(docId);
    console.log("added " + docId);
  };

  return {
    history,
    handleOnChange,
    handleOnSubmit
  };
};

export default useHistoryForm;
