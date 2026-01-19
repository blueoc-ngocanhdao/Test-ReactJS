import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/Login/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProductList from './pages/Products/ProductList';
import ProductDetail from './pages/Products/ProductDetail';
import ProductForm from './pages/Products/ProductForm';
import OrderList from './pages/Orders/OrderList';
import OrderDetail from './pages/Orders/OrderDetail';
import NotFound from './pages/NotFound/NotFound.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="products/:id/edit" element={<ProductForm />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;