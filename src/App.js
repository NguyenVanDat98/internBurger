
import Header from "./components/Header";
import BuildBurger from "./page/BuildBurger";
import "./App.css";
import "./style/index.scss";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import SignUp from "./page/SignUp";
import OrderPage from "./page/OrderPage";
import AdminPage from "./page/AdminPage";
import { QueryClient, QueryClientProvider } from "react-query";
import "./firebase-messaging-sw"

const client =new QueryClient()

function App() {
  return (
    <div className="App">
          <QueryClientProvider client={client}>
      <Header/>
      <Routes>
        <Route path="/internBurger/" element={<BuildBurger/>}> </Route>
        <Route path="/internBurger/login" element={<LoginPage/>}> </Route>
        <Route path="/internBurger/signUp" element={<SignUp/>}> </Route>
        <Route path="/internBurger/order" element={<OrderPage/>}> </Route>
        <Route path="/internBurger/orders" element={<AdminPage/>}> </Route>
      </Routes>

      </QueryClientProvider> 
      
    </div>
  );
}

export default App;
