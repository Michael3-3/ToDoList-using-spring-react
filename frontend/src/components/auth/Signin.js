import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 

function Signin({isAuthenticated, setIsAuthenticated}) {
	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }

	const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/auth/signin', {username, password});
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', response.data.username);
      setIsAuthenticated(true);
    } catch(error){
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      setIsAuthenticated(false);
      return;
    }
    
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setMessage('Sign in successful');
    await timeout(1000);
    history.push("/");
  }

  useEffect(() => {
    setMessage('')
  }, [username, password])

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
    minHeight: '90vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  }}
>
  <form
    onSubmit={onSubmit}
    style={{
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      color: '#fff',
    }}
  >
    <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 700 }}>
      Sign In
    </h1>

    <div className="form-group" style={{ marginBottom: '1rem' }}>
      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Username</label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        className="form-control"
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: '#fff',
        }}
      />
    </div>

    <div className="form-group" style={{ marginBottom: '1rem' }}>
      <label style={{ marginBottom: '0.5rem', display: 'block' }}>Password</label>
      <input
        value={password}
        type="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="form-control"
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: '#fff',
        }}
      />
    </div>

    <button
      className="btn btn-primary"
      style={{
        width: '100%',
        padding: '0.75rem',
        backgroundColor: '#FF5722',
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
      Sign In
    </button>

    <div style={{ marginTop: '1rem' }}>
      {showMessage()}
      {showErrorMessage()}
    </div>
  </form>
</div>

	)
}

export default Signin;