import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Landing({isAuthenticated, setIsAuthenticated}) {
  const [message, setMessage] = useState('')
  const [numberAllTodoNotCompleted, setNumberAllTodoNotCompleted] = useState(0);
  const [numberAllTodo, setNumberAllTodo] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const showErrorMessage = () => {
    if(errorMessage === ''){
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

  useEffect(() => {
    async function getAndSetNumberAllTodo() {
      try{
        const response = await axios.get('http://localhost:3001/api/todo/count', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          }
        });
        setNumberAllTodo(response.data.count);
      } catch (error) {
        setMessage('');
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error: something happened');
        }
      }
    }

    async function getAndSetNumberAllTodoNotCompleted() {
      try{
        const response = await axios.get('http://localhost:3001/api/todo/count?isCompleted=false', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          }
        });

        setNumberAllTodoNotCompleted(response.data.count);
      } catch (error) {
        setMessage('');
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Error: something happened');
        }
      }
      
    }
    if(isAuthenticated){
      getAndSetNumberAllTodo();
      getAndSetNumberAllTodoNotCompleted();
      setMessage(`Welcome, ${sessionStorage.getItem('name')}. You have ${numberAllTodoNotCompleted} todo not completed out of ${numberAllTodo} todo.`);
    } else {
      setMessage('Please sign in to continue');
    }
  }, [isAuthenticated, numberAllTodo, numberAllTodoNotCompleted])

	return (
		<div
  style={{
    minHeight: '90vh',
    background: 'linear-gradient(to bottom right, #0f2027, #203a43, #2c5364)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
  }}
>
  <div
    style={{
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '2rem',
      borderRadius: '16px',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
      width: '90%',
      maxWidth: '600px',
    }}
  >
    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
      📝 ToDo List Application
    </h1>
    <div style={{ marginBottom: '1rem' }}>{showErrorMessage()}</div>
    <div>{message}</div>
  </div>
</div>

	)
}