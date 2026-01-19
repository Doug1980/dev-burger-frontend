import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState, useCallback } from 'react'; // Adicionado useCallback
import { orderStatusOptions } from './orderStatus';

import { api } from '../../../services/api';
import { Row } from './row';
import { FilterOption, Filter } from './styles';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);
  const [rows, setRows] = useState([]);

  // 1. Carrega os pedidos
  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('orders');
        setOrders(data);
        setFilteredOrders(data);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      }
    }
    loadOrders();
  }, []);

  // 2. Função de formatação (Memorizada para evitar renders extras)
  const createData = useCallback((order) => {
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products,
    };
  }, []);

  // 3. Lógica de Filtragem e Formatação unificada
  // Isso evita o erro de "changed size between renders"
  useEffect(() => {
    let newFilteredOrders = [...orders];

    if (activeStatus !== 0) {
      const statusOption = orderStatusOptions.find(item => item.id === activeStatus);
      if (statusOption) {
        newFilteredOrders = orders.filter(
          (order) => order.status === statusOption.value
        );
      }
    }

    setFilteredOrders(newFilteredOrders);
    
    // Já aproveitamos para gerar as linhas da tabela aqui mesmo
    const newRows = newFilteredOrders.map((order) => createData(order));
    setRows(newRows);

  }, [orders, activeStatus, createData]);

  function handleStatus(status) {
    setActiveStatus(status.id);
  }

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