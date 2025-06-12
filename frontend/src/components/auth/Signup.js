import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom"; 

function Signup({isAuthenticated, setIsAuthenticated}) {
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
      const response = await axios.post('http://localhost:3001/api/auth/signup', {username, password});
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
    setMessage('Sign up successful');
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
      Sign Up
    </h1>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.32)',
          color: '#ffff',
          outline: 'none',
        }}
      />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Create Password</label>
      <input
        value={password}
        type="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.32)',
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
      Sign Up
    </button>

    <div style={{ marginTop: '1rem' }}>
      {showMessage()}
      {showErrorMessage()}
    </div>

    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
      <span style={{ color: '#ddd' }}>Already have an account? </span>
      <a href="/signin" style={{ color: '#FF7043', textDecoration: 'underline', fontWeight: 500 }}>
        Sign In
      </a>
    </div>
  </form>
</div>

	)
}

export default Signup;