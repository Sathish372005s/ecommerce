import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import UserProfile from "./pages/UserProfile";
import Register from "./pages/Regiter";
import Createproduct from "./adminpages/Createproduct";
import Pagenotfound from "./adminpages/Pagenotfound";
import Products from "./adminpages/Products";
import { useauthstore } from "./store/store";
import Category from "./components/Category";
import Prodcat from "./components/Prodcat";
import Carosell from "./components/Carosell";
function App() {

  const {isAuthenticated,user} = useauthstore();
  const isadmin = user?.role === "admin"
  
  return (
    <>
      <Navbar />
      <Category />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createproduct" element={isadmin ? <Createproduct /> : <Pagenotfound /> } />
        <Route path="/products" element={isadmin ? <Products /> : <Pagenotfound /> } />
        <Route path="/prodcat" element={<Prodcat />} />
      </Routes>
    </>
  )
}

export default App
