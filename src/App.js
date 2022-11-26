
import Header from "./components/Header";
import BuildBurger from "./page/BuildBurger";
import "./App.css";
import "./style/index.scss";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SignUp from "./page/SignUp";
import OrderPage from "./page/OrderPage";
import AdminPage from "./page/AdminPage";



function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<BuildBurger/>}> </Route>
        <Route path="/login" element={<LoginPage/>}> </Route>
        <Route path="/signUp" element={<SignUp/>}> </Route>
        <Route path="/order" element={<OrderPage/>}> </Route>
        <Route path="/orders" element={<AdminPage/>}> </Route>
      </Routes>

      
    </div>
  );
}

export default App;
