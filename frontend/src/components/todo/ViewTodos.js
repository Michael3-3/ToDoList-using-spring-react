import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

function Todos({ isAuthenticated, setIsAuthenticated }) {
  const [todos, setTodos] = useState([]);
  const [changed, setChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [inputPageNumber, setInputPageNumber] = useState(pageNumber);
  const [inputPageSize, setInputPageSize] = useState(pageSize);
  const [filter, setFilter] = useState("All");
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    const loadData = async () => {
      let url = `http://localhost:3001/api/todo/${pageNumber - 1}/${pageSize}`;
      if (filter === 'Completed') url += '?isCompleted=true';
      else if (filter === 'Not Completed') url += '?isCompleted=false';

      try {
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setTodos(response.data);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Error: something happened');
      }
    };

    loadData();
  }, [changed, pageNumber, pageSize, filter]);

  const nextPage = () => {
    setPageNumber(prev => prev + 1);
    setInputPageNumber(prev => prev + 1);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
      setInputPageNumber(prev => prev - 1);
    }
  };

  const enterPageNumber = (num) => {
    const parsed = parseInt(num);
    setPageNumber(parsed >= 1 ? parsed : 1);
    setInputPageNumber(parsed >= 1 ? parsed : 1);
  };

  const enterPageSize = (num) => {
    const parsed = parseInt(num);
    setPageSize(parsed >= 1 ? parsed : 1);
    setInputPageSize(parsed >= 1 ? parsed : 1);
  };

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/todo/${id}/markcomplete`, {}, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      setChanged(!changed);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error: something happened');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todo/${id}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      setChanged(!changed);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error: something happened');
    }
  };

  const showErrorMessage = () => {
    return errorMessage ? (
      <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
        {errorMessage}
      </div>
    ) : null;
  };

  const inputStyle = {
    padding: '8px',
    textAlign: 'center',
    fontSize: '16px',
    margin: '5px',
    width: '60px'
  };

  const buttonStyle = {
    padding: '8px 12px',
    fontSize: '14px',
    margin: '5px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  };

  const thtdStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#ffffff'
  };

  const pageControls = () => (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <button style={{ ...buttonStyle, backgroundColor: '#dee2e6' }} onClick={previousPage}>Previous Page</button>
      <input
        type="number"
        value={inputPageNumber}
        onChange={(e) => setInputPageNumber(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && enterPageNumber(e.target.value)}
        style={inputStyle}
      />
      <button style={{ ...buttonStyle, backgroundColor: '#dee2e6' }} onClick={nextPage}>Next Page</button>
    </div>
  );

  const pageSizeControls = () => (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <span style={{ marginRight: '10px' }}>Todos per page:</span>
      <input
        type="number"
        value={inputPageSize}
        onChange={(e) => setInputPageSize(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && enterPageSize(e.target.value)}
        style={inputStyle}
      />
    </div>
  );

  const filterControl = () => (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <label style={{ marginRight: '10px' }}>Show</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ padding: '8px', fontSize: '16px' }}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Not Completed">Not Completed</option>
      </select>
    </div>
  );

  return (
    <div style={{ backgroundColor:' #192F37', minHeight: '100vh', padding: '40px 10px' }}>
      <div style={{
        backgroundColor: '#fff',
        maxWidth: '1000px',
        margin: 'auto',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>📝 Todo List</h1>
        {showErrorMessage()}
        {filterControl()}

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtdStyle}>Title</th>
              <th style={thtdStyle}>Target Date</th>
              <th style={thtdStyle}>Is Completed?</th>
              <th style={thtdStyle}>Mark Completed</th>
              <th style={thtdStyle}>Update</th>
              <th style={thtdStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id} style={{ backgroundColor: todo.isCompleted ? 'red' : '#fefefe' }}>
                <td style={thtdStyle}>{todo.title}</td>
                <td style={thtdStyle}>{moment(todo.targetDate).format('ll')}</td>
                <td style={thtdStyle}>{todo.isCompleted.toString()}</td>
                <td style={thtdStyle}>
                  <button style={{ ...buttonStyle, backgroundColor: '#28a745', color: '#fff' }} onClick={() => markCompleted(todo.id)}>Mark Completed</button>
                </td>
                <td style={thtdStyle}>
                  <Link to={`/update/${todo.id}`}>
                    <button style={{ ...buttonStyle, backgroundColor: '#007bff', color: '#fff' }}>Update</button>
                  </Link>
                </td>
                <td style={thtdStyle}>
                  <button style={{ ...buttonStyle, backgroundColor: '#dc3545', color: '#fff' }} onClick={() => deleteTodo(todo.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pageSizeControls()}
        {pageControls()}
      </div>
    </div>
  );
}

export default Todos;
