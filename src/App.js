import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from "./routes/userRoutes/Login"
import Register from "./routes/userRoutes/Register"
import Reset from "./routes/userRoutes/Reset"
import Forget from "./routes/userRoutes/Forget"
import Home from './pages/Home';
import Item from './pages/Item';
import Cart from './pages/Cart';
import Bill from './pages/Bill';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/reset" element={<Reset/>}/>
          <Route path="/forget" element={<Forget />} />
          <Route path='/home' element={<Home />}/>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/bill/:billId" element={<Bill />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
