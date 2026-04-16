import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useUser } from '../../hooks/UserContext';
import Swal from 'sweetalert2';
import {
  Container,
  OrderCard,
  OrderHeader,
  StatusContainer,
  Step,
  Line,
  Content,
  Button,
  CancelLink,
  PageTitle,
} from './styles';

// 👇 Fora do componente — persiste entre navegações
function getNotifiedOrders() {
  try {
    return new Set(JSON.parse(localStorage.getItem('notifiedOrders') || '[]'));
  } catch {
    return new Set();
  }
}

function addNotifiedOrder(id) {
  const set = getNotifiedOrders();
  set.add(id);
  localStorage.setItem('notifiedOrders', JSON.stringify([...set]));
}

export const DeliveryStatus = () => {
  const { userInfo } = useUser();
  const navigate = useNavigate();

  const statusMap = [
    { label: 'Pedido Realizado', value: 'Pedido Realizado' },
    { label: 'Em Preparação', value: 'Em Preparação' },
    { label: 'Pedido Pronto', value: 'Pedido Pronto' },
    { label: 'Pedido à Caminho', value: 'Pedido à Caminho' },
    { label: 'Pedido Entregue', value: 'Pedido Entregue' },
  ];

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['allOrders', userInfo?.id],
    queryFn: async () => {
      const token = userInfo?.token;
      if (!token) throw new Error('Token não encontrado');
      const response = await api.get('/orders');
      const allOrders = response.data;

      // 👇 Dispara pop-up apenas uma vez por pedido entregue
      allOrders
        .filter((o) => o.status === 'Pedido Entregue')
        .forEach((o) => {
          const id = o._id || o.id;
          if (!getNotifiedOrders().has(id)) {
            addNotifiedOrder(id);
            const shortId = id.slice(-6).toUpperCase();

            Swal.fire({
              title: '✅ Pedido entregue!',
              html: `Seu pedido <strong>#${shortId}</strong> foi entregue com sucesso!<br/>Obrigado pela preferência, <strong>${userInfo?.name}</strong>! 🍔`,
              icon: 'success',
              confirmButtonText: 'Pedir novamente',
              confirmButtonColor: '#FF8F00',
            }).then(() => {
              localStorage.removeItem('lastOrderId');
              navigate('/cardapio');
            });
          }
        });

      // 👇 Retorna só pedidos em andamento
      return allOrders.filter(
        (o) =>
          o.status !== 'Pedido Entregue' && o.status !== 'Pedido Cancelado',
      );
    },
    enabled: !!userInfo?.id,
    refetchInterval: 5000,
  });

  async function handleClientCancel(orderId) {
    const { isConfirmed } = await Swal.fire({
      title: 'Cancelar pedido?',
      text: 'Tem certeza que deseja cancelar seu pedido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, cancelar',
      cancelButtonText: 'Voltar',
      confirmButtonColor: '#b71c1c',
      cancelButtonColor: '#888',
    });

    if (!isConfirmed) return;

    try {
      await api.put(`/orders/${orderId}`, {
        status: 'Pedido Cancelado',
        cancelReason: 'Cancelado pelo cliente',
      });
      localStorage.removeItem('lastOrderId');
      navigate('/cardapio');
    } catch (err) {
      Swal.fire({
        title: 'Erro',
        text: 'Não foi possível cancelar o pedido. Tente novamente.',
        icon: 'error',
        confirmButtonColor: '#FF8F00',
      });
    }
  }

  if (isLoading) {
    return (
      <Container>
        <p style={{ marginTop: '100px' }}>Carregando pedidos...</p>
      </Container>
    );
  }

  if (!orders.length) {
    return (
      <Container>
        <p
          style={{ marginTop: '100px', marginBottom: '50px', fontSize: '25px' }}
        >
          Nenhum pedido em andamento.
        </p>
        <Button onClick={() => navigate('/cardapio')}>
          Ir para o Cardápio
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>Acompanhe seu Pedido</PageTitle>

      {orders.map((order) => {
        const currentStepIndex = statusMap.findIndex(
          (s) => s.value === order.status,
        );
        const displayId = order._id || order.id;

        return (
          <OrderCard key={displayId}>
            <OrderHeader>
              <p>ID: {displayId}</p>
            </OrderHeader>

            <StatusContainer>
              {statusMap.map((step, index) => (
                <React.Fragment key={step.value}>
                  <Step active={index <= currentStepIndex}>
                    <div className="circle">{index + 1}</div>
                    <p>{step.label}</p>
                  </Step>
                  {index < statusMap.length - 1 && (
                    <Line active={index < currentStepIndex} />
                  )}
                </React.Fragment>
              ))}
            </StatusContainer>

            <Content>
              <CancelLink
                onClick={() => handleClientCancel(displayId)}
                disabled={
                  order.status !== 'Pedido Realizado' &&
                  order.status !== 'Pedido realizado' &&
                  order.status !== 'Novo Pedido'
                }
              >
                Cancelar pedido
              </CancelLink>
            </Content>
          </OrderCard>
        );
      })}
    </Container>
  );
};
