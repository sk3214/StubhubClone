import 'bootstrap/dist/css/bootstrap.min.css';

const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}

export default AppComponent;