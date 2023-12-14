import React from 'react';
import buildClient from '../api/build-client';
import BaseLayout from '../Components/BaseLayout';

const HomePage = ({ currentUser }) => {
  console.log('I am on client side context datta', currentUser);
  return (
    <BaseLayout currentUser={currentUser ? currentUser.currentUser : null}>
      <h1>Home Page</h1>
    </BaseLayout>
  );
};

export const getServerSideProps = async (context)=>{
  console.log('LandingPage')
  const {data} = await buildClient(context).get('/api/users/currentuser')
 
  return {props:data}
}

export default HomePage;

