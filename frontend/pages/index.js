import React from 'react';
import buildClient from '../api/build-client';

const HomePage = ({ currentUser }) => {
  // const response = await axios.get('/api/users/currentuser');
  console.log('I am on Client Side context', currentUser);
  return <h1>Home Page</h1>;
};

export async function getServerSideProps({ req }) {
  let currentUser = {}; // Define data here

  // console.log('host is ', req.headers);
  // if (typeof window === 'undefined') {
  //   // Server-side logic
  //   const response = await axios.get(
  //     'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
  //     {
  //       headers: req.headers,
  //     }
  //   );
  //   currentUser = response.data?.currentUser; // Set data from the server response
  //   console.log('I am on Server Side context datta', currentUser);
  // } else {
  //   // Client-side logic
  //   const response = await axios.get('/api/users/currentuser');
  //   currentUser = response.data?.currentUser; // Set data from the client response
  //   console.log('I am on Client Side context datta', currentUser);
  // }

  // return { props: { currentUser } };
  const client = await buildClient({ req }).get('/api/users/currentuser');
  currentUser = client.data?.currentUser;
  console.log('I am on Server Side context datta', currentUser);
  return { props: { currentUser } };
}

export default HomePage;
