import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./app/core/components/layout/Footer";
import Header from "./app/core/components/layout/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import Landing from "./app/core/components/layout/Landing";
import AuthRouter from "./app/auth/AuthRouter";
import FoodRouter from "./app/food/FoodRouter";
import Alert from "./app/core/components/Alert";
import { useEffect } from "react";
import { getInfo } from "./app/auth/action/authAction";
import CartRouter from "./app/cart/CartRouter";
import CustomerRouter from "./app/customer/CustomerRouter";
import AdminRouter from "./app/admin/AdminRouter";
import AdminAuthorization from "./app/admin/component/AdminAuthorization";
import { fetchFromCart } from "./app/cart/action/cartAction";
import PageDoesntExist from "./app/core/components/PageDoesntExist";
import CustomerAuthorization from "./app/customer/component/CustomerAuthorization";
function App() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.dispatch(getInfo());
    }
  });
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Header />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/food/*" element={<FoodRouter />} />
            <Route path="/cart/*" element={<CartRouter />} />

            {/* pre authroization for customer router for customer authorization */}
            <Route
              path="/customer/*"
              element={<CustomerAuthorization Component={CustomerRouter} />}
            />
            {/* pre authroization for admin router for admin authorization */}
            <Route
              path="/admin/*"
              element={<AdminAuthorization Component={AdminRouter} />}
            />
            <Route path="/*" element={<PageDoesntExist />} />
          </Routes>
          <Footer></Footer>
        </Provider>
      </Router>
    </div>
  );
}

export default App;
