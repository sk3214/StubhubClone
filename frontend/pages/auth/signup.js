import React, { useReducer } from 'react';
import axios from 'axios';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'errors':
        console.log('action', action.payload);
        return { ...state, errors: action.payload };
    default:
      return state;
  }
};

const signup = () => {
  const [userState, userDispatch] = useReducer(userReducer, {
    email: '',
    password: '',
    errors: [],
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(userState);
    try {
      const response = await axios.post('/api/users/signup', userState);
      console.log(response.data);
    } catch (err) {
        console.log('errs ',err.response.data.errors);
        userDispatch({ type: 'errors', payload: err.response.data.errors });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          className="form-control"
          onChange={(event) => {
            userDispatch({ type: 'email', payload: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(event) => {
            userDispatch({ type: 'password', payload: event.target.value });
          }}
        />
      </div>
      {userState.errors.length > 0 && (
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {userState.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default signup;
