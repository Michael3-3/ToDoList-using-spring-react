import React from 'react';
import { Link } from 'react-router-dom';

function Header({ isAuthenticated }) {
  const buttonStyle = {
    color: 'white',
    border: '1px solid transparent',
    borderRadius: '8px',
    padding: '6px 14px',
    transition: 'transform 0.2s ease, background-color 0.3s ease',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
  };

  const buttonVariants = {
    home: { backgroundColor: '#3b82f6' },       // Blue
    todo: { backgroundColor: '#10b981' },       // Green
    add: { backgroundColor: '#f59e0b' },        // Amber
    signout: { backgroundColor: '#ef4444' },    // Red
    signin: { backgroundColor: '#6366f1' },     // Indigo
    signup: { backgroundColor: '#0ea5e9' },     // Sky
    about: { backgroundColor: '#6b7280' },      // Gray
  };

  const hoverEffect = {
    transform: 'scale(1.08)',
    cursor: 'pointer',
    filter: 'brightness(1.1)',
  };

  const createButton = (to, iconClass, label, variantStyle) => (
    <li className="nav-item">
      <Link
        to={to}
        className="nav-link"
        style={{ ...buttonStyle, ...variantStyle }}
        onMouseOver={e => Object.assign(e.target.style, hoverEffect)}
        onMouseOut={e => Object.assign(e.target.style, { transform: 'scale(1)', filter: 'brightness(1)' })}
      >
        <i className={iconClass}></i> {label}
      </Link>
    </li>
  );

  return (
    <header>
      <nav
        className="navbar navbar-expand-md sticky-top shadow-sm"
        style={{ background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)' }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand text-decoration-none">
  <h5
    className="text-white"
    style={{
      fontSize: '2.1rem',
      fontWeight: '900',
      letterSpacing: '2px',
      textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      margin: 0,
    }}
  >
    <span role="img" aria-label="note">📝</span> Just<span style={{ color: '#FF5349' }}>Do</span>It
  </h5>
</Link>


          <ul className="navbar-nav d-flex flex-row" style={{ gap: '1.2rem' }}>
            {createButton('/', 'fas fa-home', 'Home', buttonVariants.home)}

            {isAuthenticated ? (
              <>
                {createButton('/todo', 'fas fa-list-check', 'View Todo', buttonVariants.todo)}
                {createButton('/add', 'fas fa-plus', 'Add Todo', buttonVariants.add)}
                {createButton('/signout', 'fas fa-sign-out-alt', 'Signout', buttonVariants.signout)}
              </>
            ) : (
              <>
                {createButton('/signin', 'fas fa-sign-in-alt', 'Signin', buttonVariants.signin)}
                {createButton('/signup', 'fas fa-user-plus', 'Signup', buttonVariants.signup)}
              </>
            )}
            {createButton('/about', 'fas fa-info-circle', 'About', buttonVariants.about)}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
