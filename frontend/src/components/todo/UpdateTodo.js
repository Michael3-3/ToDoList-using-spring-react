import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom"; 

function UpdateTodo({isAuthenticated, setIsAuthenticated, match}) {
	const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  useEffect(() => {
		if(!isAuthenticated){
			history.push("/");
		}
	}, [isAuthenticated, history])

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.put(`http://localhost:3001/api/todo/${match.params.id}`, {title, targetDate}, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
    } catch(error){
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      return;
    }

    setErrorMessage('');
    setMessage('Todo successfully updated');
    await timeout(1000);
    history.push("/todo");
  }

  useEffect(() => {
    const loadData = async () => {
      let response = null;
      try {
        response = await axios.get(`http://localhost:3001/api/todo/${match.params.id}`, {
          headers: {
						'Authorization': `Bearer ${sessionStorage.getItem('token')}`
					}
        });
      } catch(error){
        setMessage('');
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error: something happened');
        }
        return;
      }
      setErrorMessage('');
      setTitle(response.data.title);
      setTargetDate(moment(response.data.targetDate).format('YYYY-MM-DD'));
    }
    
		loadData();
  }, [match.params.id]);

  useEffect(() => {
    setMessage('')
  }, [title, targetDate])
  
  const showMessage = () => {
    if(message === ''){
      return <div></div>
    }
    return <div className="alert alert-success" role="alert">
      {message}
    </div> 
  }

  const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

	return (
		<div
  style={{
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '1rem',
  }}
>
  <form
    onSubmit={onSubmit}
    style={{
      width: '100%',
      maxWidth: '450px',
      padding: '2rem',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#fff',
    }}
  >
    <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 800 }}>
      Update Todo
    </h1>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: '#fff',
          outline: 'none',
        }}
      />
    </div>

    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Target Date</label>
      <input
        type="date"
        value={targetDate}
        onChange={e => setTargetDate(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: '#fff',
          outline: 'none',
        }}
      />
    </div>

    <button
      type="submit"
      style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#FF9800',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        color: '#fff',
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
      onMouseOver={e => (e.target.style.transform = 'scale(1.03)')}
      onMouseOut={e => (e.target.style.transform = 'scale(1)')}
    >
      Update Todo
    </button>

    <div style={{ marginTop: '1rem' }}>
      {showMessage()}
      {showErrorMessage()}
    </div>
  </form>
</div>

	)
}

export default UpdateTodo;