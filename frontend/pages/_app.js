import 'bootstrap/dist/css/bootstrap.min.css';
import buildClient from '../api/build-client'; 

const AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

AppComponent.getInitialProps = async (appContext) => {
  console.log('I am on the app.js component', appContext.ctx);
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  console.log('I am on the app.js component', data);
  return data;
}