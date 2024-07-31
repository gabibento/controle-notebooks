import React from 'react'
import Form from './Form';

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addHistory } from './addHistory';

const AcquireForm = () => {

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

  return (
    <div>
      <h1>Retirar</h1>
      <Form handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} history={history}></Form>
    </div>
  )
}

export default AcquireForm