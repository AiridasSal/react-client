import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
// import ProtectedRoute from './components/ProtectedRoute.js/ProtectedRoute';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Order from "./components/OrderForm/OrderForm";
import Logout from "./components/Logout/Logout";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import OrdersTable from "./components/OrdersTable/OrdersTable";
import Invoice from "./components/Invoice";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import { UserProvider } from "./UserContext";
import { useTranslation } from "react-i18next";

function AppContent() {
  const { t } = useTranslation();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <UserProvider>
        {!isAuthPage && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-table" element={<OrdersTable />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/order" element={<Order />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/order/:id" element={<OrderDetails />} /> {/* Add this line */}
        </Routes>

        {!isAuthPage && <Footer />}
      </UserProvider>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
