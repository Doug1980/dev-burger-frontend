import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import {
  FaClipboardList,
  FaFire,
  FaCheckCircle,
  FaMotorcycle,
  FaBoxOpen,
  FaTimesCircle,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { formatDate } from '../../../utils/formatDate';
import { ProductImage } from '../../../components/CartItems/styles';
import { SelectStatus } from './styles';
import { orderStatusOptions } from './orderStatus';
import { api } from '../../../services/api';

const statusConfig = {
  'Pedido realizado': {
    label: 'Pedido Realizado',
    icon: <FaClipboardList />,
    bg: '#e3f2fd',
    color: '#0d47a1',
  },
  'Pedido Realizado': {
    label: 'Pedido Realizado',
    icon: <FaClipboardList />,
    bg: '#e3f2fd',
    color: '#0d47a1',
  },
  'Em Preparação': {
    label: 'Em Preparação',
    icon: <FaFire />,
    bg: '#fff8e1',
    color: '#e65100',
  },
  'Pedido Pronto': {
    label: 'Pedido Pronto',
    icon: <FaCheckCircle />,
    bg: '#e8f5e9',
    color: '#1b5e20',
  },
  'Pedido à Caminho': {
    label: 'Pedido à Caminho',
    icon: <FaMotorcycle />,
    bg: '#ede7f6',
    color: '#4527a0',
  },
  'Pedido Entregue': {
    label: 'Pedido Entregue',
    icon: <FaBoxOpen />,
    bg: '#e0f7fa',
    color: '#006064',
  },
  'Pedido Cancelado': {
    label: 'Pedido Cancelado',
    icon: <FaTimesCircle />,
    bg: '#ffebee',
    color: '#b71c1c',
  },
};

// Ordem dos status — define o fluxo
const statusFlow = [
  'Pedido Realizado',
  'Em Preparação',
  'Pedido Pronto',
  'Pedido à Caminho',
  'Pedido Entregue',
];

export function Row({ row, setOrders, orders }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isNewOrder =
    !row.status || row.status === '' || row.status === 'Pedido realizado';

  const currentIndex = statusFlow.indexOf(
    row.status === 'Pedido realizado' ? 'Pedido Realizado' : row.status,
  );

  async function newStatusOrder(id, status) {
    try {
      setLoading(true);
      await api.put(`orders/${id}`, { status });
      const newOrders = orders.map((order) =>
        order._id === id ? { ...order, status } : order,
      );
      setOrders(newOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(selectedStatus) {
    const selectedValue = selectedStatus.value;

    // Cancelamento — sempre disponível com confirmação especial
    if (selectedValue === 'Pedido Cancelado') {
      const result = await Swal.fire({
        title: 'Cancelar pedido?',
        text: 'Esta ação é irreversível. Deseja cancelar o pedido do cliente?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, cancelar',
        cancelButtonText: 'Voltar',
        confirmButtonColor: '#b71c1c',
        cancelButtonColor: '#888',
      });
      if (result.isConfirmed) {
        await newStatusOrder(row.orderId, selectedValue);
      }
      return;
    }

    const selectedIndex = statusFlow.indexOf(selectedValue);

    // Bloqueio de status anterior
    if (selectedIndex <= currentIndex) {
      Swal.fire({
        title: 'Ação não permitida!',
        text: 'Não é possível voltar para um status anterior.',
        icon: 'error',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#FF8F00',
      });
      return;
    }

    // Bloqueio de pulo de etapa
    if (selectedIndex > currentIndex + 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      Swal.fire({
        title: 'Ação não permitida!',
        text: `Você precisa concluir "${nextStatus}" antes de avançar.`,
        icon: 'warning',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#FF8F00',
      });
      return;
    }

    // Confirmação de avanço normal
    const result = await Swal.fire({
      title: 'Confirmar mudança?',
      text: `Deseja avançar para "${selectedValue}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, avançar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#FF8F00',
      cancelButtonColor: '#888',
    });

    if (result.isConfirmed) {
      await newStatusOrder(row.orderId, selectedValue);
    }
  }

  const config = statusConfig[row.status];

  // Filtra opções disponíveis
  const availableOptions = orderStatusOptions.filter((s) => {
    if (s.id === 0 || s.id === 7) return false;
    if (s.value === 'Pedido Cancelado') return true; // sempre disponível
    const idx = statusFlow.indexOf(s.value);
    return idx === currentIndex + 1; // só próximo
  });

  return (
    <>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          ...(isNewOrder
            ? {
                animation: 'pulseRow 2s infinite',
                borderLeft: '4px solid #ff8c00',
              }
            : { borderLeft: '4px solid transparent' }),
        }}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isNewOrder && <span className="new-order-dot" />}
            {row.orderId}
          </div>
        </TableCell>

        <TableCell>{row.name}</TableCell>
        <TableCell>{formatDate(row.date)}</TableCell>

        <TableCell>
          <SelectStatus
            options={availableOptions}
            placeholder={isNewOrder ? '⚡ Novo pedido!' : 'Alterar status'}
            value={null}
            onChange={handleStatusChange}
            isLoading={loading}
            menuPortalTarget={document.body}
            formatOptionLabel={(option, { context }) => {
              const cfg = statusConfig[option.value];
              if (context === 'value' && cfg) {
                return (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      color: cfg.color,
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {cfg.icon}
                    {cfg.label}
                  </span>
                );
              }
              return option.label;
            }}
            styles={{
              placeholder: (base) => ({
                ...base,
                color: isNewOrder ? '#ff4400' : base.color,
                fontWeight: isNewOrder ? 700 : base.fontWeight,
              }),
              control: (base) => ({
                ...base,
                backgroundColor: isNewOrder
                  ? '#fff5e6'
                  : config
                    ? config.bg
                    : base.backgroundColor,
                borderColor: isNewOrder
                  ? '#ff8c00'
                  : config
                    ? config.color
                    : base.borderColor,
              }),
            }}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Pedido
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Imagem do Produto</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell component="th" scope="row">
                        {product.quantity}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <ProductImage src={product.url} alt={product.name} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  orders: PropTypes.array.isRequired,
  setOrders: PropTypes.func.isRequired,
  row: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};
