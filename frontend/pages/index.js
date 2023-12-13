import React from 'react';
import buildClient from '../api/build-client';

const HomePage = ({ currentUser }) => {
  console.log('I am on client side context datta', currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

HomePage.getInitialProps = async (context) => {
  const client = buildClient(context);
  console.log('Before making a call to current user');
  const { data } = await client.get('/api/users/currentuser');
  console.log('After making a call to current user');
  return data;
};

export default HomePage;

