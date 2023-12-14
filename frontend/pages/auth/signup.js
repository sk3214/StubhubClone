import React, { useReducer } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import BaseLayout from '../../Components/BaseLayout';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};

const signup = () => {
  const [userState, userDispatch] = useReducer(userReducer, {
    email: '',
    password: '',
  });
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: userState,
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log('Before updating Error', userState);
    await doRequest();
  };


  return (
    <BaseLayout currentUser={currentUser && currentUser.currentUser}>
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
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
    </BaseLayout>
  );
};

export default signup;
