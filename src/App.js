import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CartContextProvider from './components/CartContext';
import Home from './components/Home';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart  from './components/Cart';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Contact from './components/Contact';

const App = () => {
  return (
  <CartContextProvider> 
    <BrowserRouter>
    <NavBar />
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:idCategory' element={<ItemListContainer />} />
          <Route path='/item/:idItem' element={<ItemDetailContainer />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contact' element={<Contact />} />
      </Routes>
    <Footer />  
    </BrowserRouter>
  </CartContextProvider>   

  );
}

export default App;
