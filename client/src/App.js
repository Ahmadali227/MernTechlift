import {Navigate, Route,Routes} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import Footer from './components/Layout/Footer';
function App() {
  return (
    <>

    <Routes>
      <Route path ='/' element={<ProtectedRoutes><Homepage/></ProtectedRoutes>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Page404/>}/>

    </Routes>
    
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children
  }else{
    return <Navigate to='/login'/>
  }
}

export default App;
