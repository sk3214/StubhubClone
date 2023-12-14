import Header from "./Header"

const BaseLayout = ({ children, currentUser }) => {
    console.log('currentUser in BaseLayout', currentUser);
  return (
    <div className="container">
      <Header currentUser={currentUser}></Header>
      {children}
    </div>  )
}

export default BaseLayout