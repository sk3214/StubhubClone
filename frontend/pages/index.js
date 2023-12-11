import React from 'react';
import buildClient from '../api/build-client';

const HomePage = ({ currentUser }) => {
  // const response = await axios.get('/api/users/currentuser');
  console.log('I am on Client Side context', currentUser);
  return <h1>Home Page</h1>;
};

export async function getServerSideProps({ req }) {
  // return { props: { currentUser } };
  const client = await buildClient({ req });
  const response = await client.get('/api/users/currentuser');
  const currentUser = response.data?.currentUser;
  console.log('I am on Server Side context datta', currentUser);
  return { props: { currentUser } };
}

export default HomePage;
