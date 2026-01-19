import { Route, Routes, Navigate } from 'react-router-dom';
import { useUser } from '../hooks/UserContext';

import {
  Cart,
  Checkout,
  CompletePayment,
  DeliveryStatus,
  EditProduct,
  Home,
  Login,
  Menu,
  NewProduct,
  Orders,
  Products,
  Register,
} from '../containers';

import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';

export function Router() {
  const { userInfo } = useUser();

  return (
    <Routes>
      {userInfo ? (
        <>
          {/* BLOCO DO USUÁRIO COMUM */}
          <Route 
            path="/" 
            element={
              userInfo.admin ? <Navigate to="/admin/pedidos" replace /> : <UserLayout />
            }
          >
            <Route index element={<Home />} />
            <Route path="cardapio" element={<Menu />} />
            <Route path="carrinho" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="completepayment" element={<CompletePayment />} />
            <Route path="deliveryStatus" element={<DeliveryStatus />} />
          </Route>

          {/* BLOCO DO ADMIN */}
          <Route 
            path="/admin" 
            element={
              userInfo.admin ? <AdminLayout /> : <Navigate to="/" replace />
            }
          >
            <Route path="pedidos" element={<Orders />} />
            <Route path="novo-produto" element={<NewProduct />} />
            <Route path="editar-produto" element={<EditProduct />} />
            <Route path="produtos" element={<Products />} />
          </Route>
          
          {/* Travas para logados não voltarem ao Login */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/cadastro" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          {/* BLOCO PÚBLICO (NÃO LOGADO) */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          {/* Qualquer outra rota manda para o Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
}