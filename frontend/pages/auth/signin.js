import React, { useReducer } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import BaseLayout from '../../Components/BaseLayout';
import buildClient from '../../api/build-client';

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

const signin = ({currentUser}) => {
  console.log('currentUser in signin', currentUser);  
  const [userState, userDispatch] = useReducer(userReducer, {
    email: '',
    password: '',
  });
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
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
      <h1>Sign In</h1>
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
      <button className="btn btn-primary">Sign In</button>
    </form>
    </BaseLayout>
  );
};

export const getServerSideProps = async (context) => {
    const client = buildClient(context);
    let currentUser;
    try {
      const currentUserRes = await client.get("/api/users/currentuser");
      currentUser = currentUserRes.data;
    } catch (e) {
      console.log("error in sigin page", e);
    }
    if (!currentUser) {
      currentUser = null;
    }
  
    return { props: { currentUser } };
  };

export default signin;
