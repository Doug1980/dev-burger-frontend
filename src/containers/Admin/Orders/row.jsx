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
    bg: '#e8f5e9',
    color: '#1b5e20',
  },
  'Pedido Cancelado': {
    label: 'Pedido Cancelado',
    icon: <FaTimesCircle />,
    bg: '#ffebee',
    color: '#b71c1c',
  },
};

export function Row({ row, setOrders, orders }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isNewOrder =
    !row.status || row.status === '' || row.status === 'Pedido realizado';

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

  const config = statusConfig[row.status];

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
            : {
                borderLeft: '4px solid transparent',
              }),
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
          {isNewOrder ? (
            <SelectStatus
              options={orderStatusOptions.filter(
                (s) => s.id !== 0 && s.id !== 7,
              )}
              placeholder="⚡ Novo pedido!"
              onChange={(status) => newStatusOrder(row.orderId, status.value)}
              isLoading={loading}
              menuPortalTarget={document.body}
              styles={{
                placeholder: (base) => ({
                  ...base,
                  color: '#ff4400',
                  fontWeight: 700,
                }),
                control: (base) => ({
                  ...base,
                  borderColor: '#ff8c00',
                  backgroundColor: '#fff5e6',
                }),
              }}
            />
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              {config && (
                <span
                  style={{
                    background: config.bg,
                    color: config.color,
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '5px 12px',
                    borderRadius: 6,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {config.icon}
                  {config.label}
                </span>
              )}
              <SelectStatus
                options={orderStatusOptions.filter(
                  (s) => s.id !== 0 && s.id !== 7,
                )}
                placeholder="Alterar status"
                defaultValue={orderStatusOptions.find(
                  (s) => s.value === row.status,
                )}
                onChange={(status) => newStatusOrder(row.orderId, status.value)}
                isLoading={loading}
                menuPortalTarget={document.body}
              />
            </div>
          )}
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
