import React from 'react';

export default function About() {
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
      maxWidth: '500px',
    }}
  >
    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>About</h1>
    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)' }}>
      This is a ToDo List App — version <strong>1.0.0</strong>. <br />
      Organize your tasks. Stay productive.
    </p>
  </div>
</div>

	)
}