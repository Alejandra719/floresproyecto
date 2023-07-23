import { BrowserRouter, Routes , Route } from 'react-router-dom';
import Signin from './Signin';
import Profile from './Profile';
import Productos from './Productos';
import ProductoDetalle from './ProductoDetalle';

function App() {

  const token = localStorage.getItem('id');

  if(!token){
    return <Signin />
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/" element={<Profile />}/>
          <Route exact path='/productos' element={<Productos />}></Route>
          <Route path='/productos/:prodID' element={<ProductoDetalle />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
