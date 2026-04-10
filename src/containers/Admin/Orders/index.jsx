import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState, useCallback } from 'react';
import { orderStatusOptions } from './orderStatus';
import { api } from '../../../services/api';
import { Row } from './row';
import { FilterOption, Filter } from './styles';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);
  const [rows, setRows] = useState([]);

  // Injeta animações CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes pulseRow { 0%,100%{background:#fff5e6} 50%{background:#ffe8c0} }
      @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.8)} }
      .new-order-dot {
        display:inline-block; width:10px; height:10px; border-radius:50%;
        background:#ff4400; animation:pulseDot 1s infinite; margin-right:8px; flex-shrink:0;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Carrega pedidos + auto-refresh a cada 15s
  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('orders');
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error('Erro ao carregar pedidos:', err);
      }
    }

    loadOrders();
    const interval = setInterval(loadOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const createData = useCallback((order) => {
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products,
    };
  }, []);

  useEffect(() => {
    let newFilteredOrders = [...orders];

    if (activeStatus !== 0) {
      const statusOption = orderStatusOptions.find(
        (item) => item.id === activeStatus,
      );
      if (statusOption) {
        if (statusOption.id === 7) {
          newFilteredOrders = orders.filter(
            (o) =>
              !o.status || o.status === '' || o.status === 'Pedido realizado',
          );
        } else {
          newFilteredOrders = orders.filter(
            (order) => order.status === statusOption.value,
          );
        }
      }
    }

    setFilteredOrders(newFilteredOrders);
    const newRows = newFilteredOrders.map((order) => createData(order));
    setRows(newRows);
  }, [orders, activeStatus, createData]);

  function handleStatus(status) {
    setActiveStatus(status.id);
  }

  // Conta novos pedidos por status
  const countNewOrders = (statusValue) => {
    return orders.filter((o) => o.status === statusValue || !o.status).length;
  };

  const newOrdersCount = orders.filter(
    (o) => !o.status || o.status === '' || o.status === 'Pedido realizado',
  ).length;

  return (
    <>
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOption
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActiveStatus={activeStatus === status.id}
          >
            {status.label}
            {status.id === 7 && newOrdersCount > 0 && (
              <span
                style={{
                  marginLeft: 6,
                  background: '#ff4400',
                  color: 'white',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 20,
                  verticalAlign: 'middle',
                }}
              >
                {newOrdersCount}
              </span>
            )}
          </FilterOption>
        ))}
      </Filter>

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedidos</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data do Pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
