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
  'Novo Pedido': {
    label: 'Novo Pedido',
    icon: <FaClipboardList />,
    bg: '#fff3e0',
    color: '#e65100',
  },

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
  'Novo Pedido',
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
    !row.status ||
    row.status === '' ||
    row.status === 'Pedido realizado' ||
    row.status === 'Novo Pedido';

  const currentIndex = statusFlow.indexOf(
    row.status === 'Pedido realizado' ? 'Pedido Realizado' : row.status,
  );

  async function newStatusOrder(id, status, cancelReason = null) {
    try {
      setLoading(true);
      await api.put(`orders/${id}`, { status, cancelReason });
      const newOrders = orders.map((order) =>
        order._id === id ? { ...order, status, cancelReason } : order,
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

    if (selectedValue === 'Pedido Cancelado') {
      const { value: motivo } = await Swal.fire({
        title: 'Cancelar pedido?',
        icon: 'warning',
        html: `
          <p style="font-size:13px; color:#888; margin-bottom:16px;">Selecione o motivo do cancelamento:</p>
          <div style="display:flex; flex-direction:column; gap:8px; text-align:left;">
            <label style="display:flex; align-items:center; gap:10px; padding:10px 12px; border:1.5px solid #eee; border-radius:8px; cursor:pointer; font-size:13px;">
              <input type="radio" name="motivo" value="Produto em falta" style="accent-color:#b71c1c;"> 📦 Produto em falta
            </label>
            <label style="display:flex; align-items:center; gap:10px; padding:10px 12px; border:1.5px solid #eee; border-radius:8px; cursor:pointer; font-size:13px;">
              <input type="radio" name="motivo" value="Restaurante fechado" style="accent-color:#b71c1c;"> 🔒 Restaurante fechado
            </label>
            <label style="display:flex; align-items:center; gap:10px; padding:10px 12px; border:1.5px solid #eee; border-radius:8px; cursor:pointer; font-size:13px;">
              <input type="radio" name="motivo" value="Problema técnico" style="accent-color:#b71c1c;"> ⚙️ Problema técnico
            </label>
            <label style="display:flex; align-items:center; gap:10px; padding:10px 12px; border:1.5px solid #eee; border-radius:8px; cursor:pointer; font-size:13px;">
              <input type="radio" name="motivo" value="Outro" style="accent-color:#b71c1c;" id="radio-outro"> ✏️ Outro
            </label>
            <textarea id="motivo-outro" placeholder="Descreva o motivo..." rows="3"
              style="display:none; width:100%; border:1.5px solid #ddd; border-radius:8px; padding:8px 10px; font-size:12px; resize:none; box-sizing:border-box; font-family:inherit; margin-top:4px;">
            </textarea>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Sim, cancelar',
        cancelButtonText: 'Voltar',
        confirmButtonColor: '#b71c1c',
        cancelButtonColor: '#888',
        didOpen: () => {
          const radioOutro = document.getElementById('radio-outro');
          const textareaOutro = document.getElementById('motivo-outro');
          document.querySelectorAll('input[name="motivo"]').forEach((radio) => {
            radio.addEventListener('change', () => {
              textareaOutro.style.display =
                radio.value === 'Outro' ? 'block' : 'none';
            });
          });
        },
        preConfirm: () => {
          const selected = document.querySelector(
            'input[name="motivo"]:checked',
          );
          if (!selected) {
            Swal.showValidationMessage(
              'Selecione um motivo para o cancelamento!',
            );
            return false;
          }
          if (selected.value === 'Outro') {
            const texto = document.getElementById('motivo-outro').value.trim();
            if (!texto) {
              Swal.showValidationMessage('Descreva o motivo do cancelamento!');
              return false;
            }
            return texto;
          }
          return selected.value;
        },
      });

      if (motivo) {
        await newStatusOrder(row.orderId, selectedValue, motivo);
      }
      return;
    }

    const selectedIndex = statusFlow.indexOf(selectedValue);

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

    const result = await Swal.fire({
      title: 'Confirmar novo status?',
      text: `Deseja avançar para "${selectedValue}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Avançar',
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
    if (s.id === 0) return false; // remove "Todos" sempre
    if (s.id === 7 && !isNewOrder) return false; // remove "Novo Pedido" se não for novo
    return true;
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
        {/* 👇 Botão expandir */}
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {/* 👇 ID do pedido */}
        <TableCell component="th" scope="row">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isNewOrder && <span className="new-order-dot" />}
            {row.orderId}
          </div>
        </TableCell>

        {/* 👇 Nome do cliente */}
        <TableCell>{row.name}</TableCell>

        {/* 👇 Data */}
        <TableCell>{formatDate(row.date)}</TableCell>

        {/* 👇 Select de status */}
        <TableCell>
          <SelectStatus
            options={availableOptions}
            value={
              orderStatusOptions.find((s) => {
                if (row.status === 'Pedido realizado')
                  return s.value === 'Pedido Realizado';
                if (!row.status || row.status === '')
                  return s.value === 'Novo Pedido';
                return s.value === row.status;
              }) || null
            }
            onChange={(selected) => {
              // 👈 Se for cancelamento, passa direto para o handleStatusChange
              if (selected.value === 'Pedido Cancelado') {
                handleStatusChange(selected);
                return;
              }

              const selectedIndex = statusFlow.indexOf(selected.value);
              const isCurrent =
                selected.value === row.status ||
                (row.status === 'Pedido realizado' &&
                  selected.value === 'Pedido Realizado');
              const isPrevious = selectedIndex < currentIndex;

              if (isCurrent || isPrevious) {
                Swal.fire({
                  title: 'Ação não permitida!',
                  text: 'Não é possível voltar para um status anterior.',
                  icon: 'error',
                  confirmButtonText: 'Entendido',
                  confirmButtonColor: '#FF8F00',
                });
                return;
              }
              handleStatusChange(selected);
            }}
            isLoading={loading}
            isDisabled={
              row.status === 'Pedido Entregue' ||
              row.status === 'Pedido Cancelado'
            }
            menuPortalTarget={document.body}
            formatOptionLabel={(option) => {
              const cfg = statusConfig[option.value];
              if (!cfg) return option.label;

              const optionIndex = statusFlow.indexOf(option.value);
              const isCurrent =
                option.value === row.status ||
                (row.status === 'Pedido realizado' &&
                  option.value === 'Pedido Realizado');
              const isPrevious = optionIndex < currentIndex;
              const isNext = optionIndex === currentIndex + 1;
              const isBlocked =
                optionIndex > currentIndex + 1 &&
                option.value !== 'Pedido Cancelado';
              const isCancel = option.value === 'Pedido Cancelado';

              let tag = null;
              if (isCurrent)
                tag = { label: 'atual', bg: '#ffe082', color: cfg.color };
              else if (isCancel)
                tag = {
                  label: 'sempre disponível',
                  bg: '#ffcdd2',
                  color: '#b71c1c',
                };
              else if (isPrevious)
                tag = { label: 'anterior', bg: '#f0f0f0', color: '#888' };
              else if (isNext)
                tag = { label: 'próximo ▶', bg: '#a5d6a7', color: '#1b5e20' };
              else if (isBlocked)
                tag = { label: 'bloqueado 🔒', bg: '#f0f0f0', color: '#888' };

              return (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    opacity: (isPrevious || isBlocked) && !isCancel ? 0.4 : 1,
                    padding: '2px 0',
                  }}
                >
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
                  {tag && (
                    <span
                      style={{
                        fontSize: 9,
                        padding: '2px 6px',
                        borderRadius: 3,
                        fontWeight: 700,
                        background: tag.bg,
                        color: tag.color,
                        marginLeft: 8,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tag.label}
                    </span>
                  )}
                </div>
              );
            }}
            styles={{
              option: (base, { data }) => {
                const cfg = statusConfig[data.value];
                return {
                  ...base,
                  background: cfg ? cfg.bg : base.background,
                  padding: '8px 12px',
                };
              },
              singleValue: (base) => ({
                ...base,
                color: config ? config.color : base.color,
                fontWeight: 700,
                fontSize: 12,
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
                borderWidth: 1.5,
                minWidth: 190,
              }),
              indicatorSeparator: () => ({ display: 'none' }),
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
