import React, { useState } from 'react';

const Signup = () => {
  return (
    <div style={styles.container}>
      <h3>Sign Up</h3>
      <form className="signup-form">
        <div style={styles.formGroup}>
          <label>Username</label>
          <input 
            type="text" 
            placeholder="Enter your username" 
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Email Address</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Confirm Password</label>
          <input 
            type="password" 
            placeholder="Confirm your password" 
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '8px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default Signup;
